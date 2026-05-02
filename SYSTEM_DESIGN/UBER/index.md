# 🚗 Uber – System Design Notes

> My own understanding of how Uber works under the hood — from ride pricing to real-time tracking.

---

## 📌 What Is Uber?

Uber is a ride-hailing service where a rider requests a ride, the system estimates the fare, finds nearby available drivers, and matches one to the rider. During the trip, the system tracks the driver's real-time location and streams updates to the rider's map. The trip moves through a lifecycle of states — searching, matched, in progress, completed — with each transition triggering side effects like notifications, fare metering, and payment.

---

## ✅ Functional Requirements

| # | Requirement | Core Operation |
|---|---|---|
| 1 | Rider enters pickup + destination → system returns fare estimate and ETA | COMPUTE (Ride Pricing) |
| 2 | After rider confirms → system finds nearby drivers and assigns one via offer/accept | SEARCH + ASSIGN (Driver Matching) |
| 3 | Online drivers send GPS every few seconds → rider sees live driver position on map | INGEST + PUSH (Real-Time Tracking) |
| 4 | Trip moves through well-defined states with side effects at each transition | STATE MACHINE (Trip Lifecycle) |

### Scale Assumptions

| Parameter | Value |
|---|---|
| Daily Active Riders | ~50 Million |
| Registered Drivers | ~5 Million |
| Drivers Online at Peak | ~2 Million |
| Trips Per Day | ~20 Million |
| Driver Location Update Frequency | Every ~4 seconds |
| Peak Location Writes | ~500,000 writes/sec |
| Ride Matching Target | Under 5 seconds end-to-end |

---

## ⚙️ Non-Functional Requirements

| Requirement | Description |
|---|---|
| Low Latency | Sub-second geospatial lookup; under 5s end-to-end matching |
| High Throughput | ~500K location writes/sec at peak |
| Strong Consistency | Driver must never be double-assigned; trip state transitions must be atomic |
| High Availability | Ride requests and tracking must stay up during peak; brief location staleness is tolerable |

---

## 🗃️ Data Model

```mermaid
erDiagram
    Trip {
        string id PK
        string rider_id
        string driver_id FK
        string status
        float pickup_lat
        float pickup_lng
        float dest_lat
        float dest_lng
        float estimated_fare
        float actual_fare
        datetime created_at
        datetime completed_at
    }
    Driver {
        string id PK
        string name
        string status
        int version
    }
    DriverLocation {
        string driver_id FK
        float lat
        float lng
        float heading
        float speed
        datetime timestamp
        string trip_id
    }

    Trip }o--|| Driver : "assigned to"
    Driver ||--o{ DriverLocation : "sends updates"
```

---

## 🌐 API Design

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/rides/estimate?pickup_lat=&pickup_lng=&dest_lat=&dest_lng=` | Get fare estimate + ETA before confirming |
| POST | `/rides` | Confirm and request a ride — triggers matching |
| GET | `/rides/{id}` | Get ride status + driver info (live updates via WebSocket) |
| POST | `/rides/{id}/cancel` | Cancel a ride |
| PUT | `/drivers/{id}/location` | Driver sends GPS update (WebSocket; REST as fallback) |
| POST | `/rides/{id}/offer/accept` | Driver accepts a ride offer |
| POST | `/rides/{id}/offer/decline` | Driver declines — system tries next candidate |
| POST | `/rides/{id}/rating` | Rate the ride after completion |

---

## 🏗️ High-Level Architecture

### 1. Ride Pricing Flow

Before a rider confirms, the system calculates the route and estimates the fare.

**Fare Formula:**
```
fare = base_fare + (distance_km × per_km_rate) + (duration_min × per_min_rate)
```
If surge is active in the pickup zone → multiply by surge factor.

```mermaid
flowchart LR
    A(👤 Rider App) -->|GET /rides/estimate| B[API Gateway]
    B --> C[Ride Service]
    C -->|Send coordinates| D[Routing Service]
    D -->|Road network graph Dijkstra / A*| D
    D -->|Return distance + duration| C
    C -->|Compute fare| C
    C -->|Store trip SEARCHING| E[(Trip DB)]
    C -->|Return fare + ETA| A
```

---

### 2. Find and Match a Driver

After the rider confirms, the system finds nearby available drivers using a **geospatial index** and sends them an offer.

#### Why not query the database directly?
A raw SQL scan across 2M drivers with a distance filter is too slow at 1000+ ride requests/sec. Instead we use **Geohash-based spatial indexing** — encode each driver's coordinates into a string where nearby locations share a common prefix.

```mermaid
flowchart TD
    A(👤 Rider confirms ride) --> B[Ride Service]
    B --> C[Matching Service]
    C -->|Compute rider geohash| C
    C -->|Query 9 cells - rider cell + 8 neighbors| D[(Geospatial Index In-Memory)]
    D -->|Return nearby available drivers| C
    C -->|Rank by distance| C
    C -->|Send offer via WebSocket| E[Connection Service]
    E -->|Offer: accept?| F(🚗 Driver App)
    F -- Accept --> G[Ride transitions to MATCHED]
    F -- Decline or Timeout --> H[Try next candidate]
    H --> C
```

#### Geospatial Index Options

| Method | How It Works | Best For |
|---|---|---|
| **Geohash** ✅ | Encodes lat/lng into prefix string; nearby = shared prefix | Simple, widely used |
| Quadtree | Recursively divides space into 4 quadrants | Dynamic density areas |
| R-Tree | Tree of bounding rectangles | Complex polygon queries |

> If too few drivers are found → expand to a coarser geohash precision (larger area) and retry.

---

### 3. Real-Time Driver Tracking

2 million drivers × 1 update / 4s = **~500,000 writes/sec** at peak.

#### Communication Options

| Method | Pros | Cons |
|---|---|---|
| **WebSocket** ✅ | Bidirectional, persistent, low overhead | Stateful — harder to scale horizontally |
| Long Polling | Works everywhere | High overhead, higher latency |
| SSE | Simple server push | One direction only (server → client) |

```mermaid
flowchart TD
    DA(🚗 Driver App) -->|GPS update every ~4s| CS_A[Connection Service A]
    CS_A --> LS[Location Service]

    LS -->|Update geohash cell| GI[(Geospatial Index In-Memory)]
    LS -->|Is driver on active trip?| CHECK{Active Trip?}

    CHECK -- Yes --> REG[(Connection Registry user_id to server instance)]
    REG -->|Find rider's server| CS_B[Connection Service B]
    CS_B -->|Push location update| RA(👤 Rider App)

    CHECK -- No --> SKIP[Skip relay]

    LS -->|Async| MQ[Message Queue]
    MQ --> TSDB[(Time-Series DB for history + analytics)]
```

**Hot vs Cold Path:**

| Path | Purpose | Storage | Latency |
|---|---|---|---|
| Hot | Real-time matching + relay to rider | In-memory (Redis / geospatial store) | ~milliseconds |
| Cold | Historical records, analytics, disputes | Time-series DB (batched writes) | Seconds to minutes |

---

### 4. Trip Lifecycle (State Machine)

```mermaid
stateDiagram-v2
    [*] --> SEARCHING : Rider confirms ride
    SEARCHING --> MATCHED : Driver accepts offer
    MATCHED --> ARRIVED : Driver reaches pickup
    ARRIVED --> IN_PROGRESS : Rider gets in car
    IN_PROGRESS --> COMPLETED : Reached destination
    SEARCHING --> CANCELLED : Rider cancels or no drivers found
    MATCHED --> CANCELLED : Rider or driver cancels
    COMPLETED --> [*]
    CANCELLED --> [*]
```

#### Side Effects at Each Transition

| Transition | Side Effects Triggered |
|---|---|
| SEARCHING → MATCHED | Notify rider with driver details + ETA; start streaming driver location |
| MATCHED → ARRIVED | Notify rider "Driver has arrived"; start wait timer |
| ARRIVED → IN_PROGRESS | Start fare metering (distance + time tracking) |
| IN_PROGRESS → COMPLETED | Calculate final fare; trigger payment; prompt ratings |
| Any → CANCELLED | Determine cancellation fee based on state; notify both parties |

```mermaid
flowchart LR
    TS[Trip Service] -->|Atomic: state update + outbox write| DB[(Trip DB + Outbox)]
    DB --> OR[Outbox Reader]
    OR -->|Publish domain events| MQ[Message Queue]
    MQ --> N[Notification Service]
    MQ --> P[Payment Service]
    MQ --> AN[Analytics Service]
```

> **Why outbox pattern?** If the DB saves but the event publish fails, trip state and side effects go out of sync. Writing the event in the same DB transaction guarantees they always move together — no dual-write problem.

---

## 🔍 Deep Dive: Handling 500K Location Writes/Second

```mermaid
flowchart TD
    D[2M Online Drivers] -->|~500K writes/sec| LS[Location Service]

    LS -->|Hot Path| GI["⚡ In-Memory Geospatial Index
    Sharded by region / city"]

    LS -->|Cold Path| MQ[Message Queue]
    MQ -->|Batch writes| TSDB[(Time-Series DB)]

    GI -->|Queried by| MS[Matching Service]
```

**Key strategies:**

| Strategy | Why |
|---|---|
| Separate hot and cold paths | Real-time index doesn't need durability; it rebuilds in seconds from driver re-reports |
| Shard by geography | Partition index by region/city using coarse geohash prefix (first 2–3 chars) |
| Adaptive update frequency | Stationary drivers report less often; active trips report more often |
| Stale driver handling | No update for ~30s → mark driver stale and exclude from matching |
| Failure recovery | Promote replica shard OR replay last 30s from message queue |

---

## 🔄 Full System Architecture

```mermaid
flowchart TD
    RA(👤 Rider App)
    DA(🚗 Driver App)

    RA <-->|WebSocket| CS[Connection Service]
    DA <-->|WebSocket| CS

    CS --> GW[API Gateway]

    GW --> RS[Ride Service]
    GW --> LS[Location Service]

    RS --> RT[Routing Service]
    RS --> MS[Matching Service]
    RS --> TS[Trip Service]

    MS --> GI[(Geospatial Index In-Memory)]
    MS --> CS

    LS --> GI
    LS --> CR[(Connection Registry)]
    LS --> MQ[Message Queue]

    CR --> CS
    MQ --> TSDB[(Time-Series DB)]
    MQ --> EC[Event Consumers\nNotifications / Payment / Analytics]

    TS --> TDB[(Trip DB + Outbox)]
    TDB --> OR[Outbox Reader]
    OR --> MQ

    RS --> TDB
    RT --> TDB
```

---

## 📊 Interview Level Expectations

| Topic | Mid-Level (L4) | Senior (L5) | Staff (L6) |
|---|---|---|---|
| **Geospatial Search** | Explain why DB scan is slow; suggest geohash | Compare geohash vs quadtree vs R-tree with tradeoffs | Handle boundary cases, precision tuning, multi-region sharding |
| **Real-Time Communication** | Use WebSocket; understand persistent connection | Explain connection registry + multi-instance routing | Handle reconnects, backpressure, event replay at scale |
| **Location Scale** | Mention in-memory store for speed | Design hot/cold path split; shard by region | Adaptive frequency, failure recovery, replay strategy |
| **Driver Assignment** | Avoid double-dispatch; mention locking | Optimistic concurrency with version field | Multi-region consistency, partition tolerance tradeoffs |
| **Trip State Machine** | Define states and transitions | Atomic transitions + outbox pattern for side effects | Idempotent consumers, saga pattern for distributed rollback |

---

## 🛠️ Tech Stack Summary

| Component | Technology |
|---|---|
| Main Database | PostgreSQL / CockroachDB (trip records) |
| Geospatial Index | Redis with geospatial commands (in-memory) |
| Time-Series Store | InfluxDB / Cassandra (location history) |
| Message Queue | Kafka (location stream + domain events) |
| Real-Time Comms | WebSocket via Connection Service |
| Connection Registry | Redis (user_id → server instance mapping) |
| Routing Service | Custom graph engine or Google Maps API |
| API Gateway | Routes REST + WebSocket traffic |

---

> 📖 Reference: [systemdesignschool.io – Design Uber](https://systemdesignschool.io/problems/uber/solution)
