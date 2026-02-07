# Networking Concepts for SWE Interviews

> Core topics you need for front-end, backend, and full-stack interviews. For deeper system-design level (IP, subnets, proxies), see `system-design-interview/02-networking-fundamentals.md`.

---

## 1. OSI model (7 layers)

The **OSI (Open Systems Interconnection) model** is a conceptual **7-layer** framework that describes how data moves from an application on one machine to an application on another. Interviewers often ask “What is the OSI model?” or “Which layer does X belong to?”

### The 7 layers (top to bottom)

| Layer | Name | What it does | Examples / protocols |
|-------|------|----------------|----------------------|
| **7** | Application | Services for apps (what the user sees) | HTTP, HTTPS, FTP, SMTP, DNS (as an app protocol) |
| **6** | Presentation | Format, encrypt, compress data | SSL/TLS (encryption), JSON/XML (format) |
| **5** | Session | Establish, manage, end sessions | Session management, keep-alive |
| **4** | Transport | End-to-end reliability, flow control | **TCP**, **UDP** |
| **3** | Network | Routing, logical addressing (IP) | **IP**, routers |
| **2** | Data Link | Frame data, physical addressing (MAC) | Ethernet, switches, MAC addresses |
| **1** | Physical | Bits on the wire (cables, radio) | Cables, Wi-Fi, fiber |

### Mnemonic (top to bottom)

**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing  
→ Application, Presentation, Session, Transport, Network, Data Link, Physical.

### How it maps to “type a URL”

When you type a URL and press Enter:

- **Layer 7:** Browser sends **HTTP** request (e.g. GET).
- **Layer 6:** **TLS** encrypts the data (HTTPS).
- **Layer 5:** Session/connection kept alive (e.g. HTTP keep-alive).
- **Layer 4:** **TCP** connection (reliable stream) or UDP for some protocols.
- **Layer 3:** **IP** packets routed (source/dest IP, routers).
- **Layer 2:** Frames on the **local network** (e.g. Ethernet, Wi-Fi), MAC addresses.
- **Layer 1:** Actual **physical** transmission (electrical/optical/radio).

### What to say in an interview

- “OSI is a 7-layer model for how data moves across a network.”
- “Layer 7 is application — HTTP, HTTPS. Layer 4 is transport — TCP, UDP. Layer 3 is network — IP and routing.”
- “In practice we often use a simpler **TCP/IP model** (4 layers: Application, Transport, Internet, Link), but OSI is still the one people ask about.”

---

## 2. HTTP basics

### Request / response

- **Request:** Method, URL, headers, optional body. Example: `GET /api/users HTTP/1.1`, headers like `Host`, `Authorization`, `Content-Type`.
- **Response:** Status code, headers, body. Example: `200 OK`, `Content-Type: application/json`, body with data.

### HTTP methods (verbs)

| Method | Idempotent? | Safe? | Typical use |
|--------|-------------|-------|-------------|
| GET | Yes | Yes | Read resource; no body; cacheable |
| POST | No | No | Create, submit form, non-idempotent action |
| PUT | Yes | No | Replace resource at URI (full replace) |
| PATCH | No* | No | Partial update |
| DELETE | Yes | No | Remove resource |
| HEAD | Yes | Yes | Like GET but no body (headers only) |
| OPTIONS | Yes | Yes | CORS preflight, allowed methods |

*PATCH is often idempotent in practice but not required by spec.

**Idempotent:** Same request N times = same effect as once. **Safe:** No server state change.

### HTTP status codes (must know)

| Range | Meaning | Examples |
|-------|---------|----------|
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | Client error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 409 Conflict, 429 Too Many Requests |
| 5xx | Server error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

- **401:** Not authenticated (who are you?). **403:** Authenticated but not allowed (you can’t do this).
- **304:** Conditional GET; resource unchanged; use cached copy.

### HTTP/1.1 vs HTTP/2 vs HTTP/3

- **HTTP/1.1:** One request per connection (pipelining rarely used); multiple connections for parallelism; text headers.
- **HTTP/2:** Multiplexing (many streams over one connection), binary, header compression (HPACK), server push (optional).
- **HTTP/3:** Over QUIC (UDP-based); faster connection setup, better on lossy networks; no head-of-line blocking at transport.

---

## 3. HTTPS and TLS

- **HTTPS** = HTTP over **TLS** (Transport Layer Security). Encrypts and authenticates.
- **What TLS does:** Encrypts data in transit; server (and optionally client) authentication via certificates; integrity (tampering detection).
- **Handshake (simplified):** Client hello → Server hello + cert → Key exchange → Encrypted application data. Involves asymmetric crypto (e.g. RSA/ECDHE) then symmetric encryption for the session.
- **Why it matters for front-end:** Mixed content (HTTP on HTTPS page) is blocked; cookies should use `Secure` on HTTPS; HSTS tells browser to use HTTPS only.

---

## 4. TCP vs UDP

| | TCP | UDP |
|---|-----|-----|
| **Connection** | Connection-oriented (handshake, then stream) | Connectionless (no handshake) |
| **Reliability** | Reliable (retransmit, order, no duplicates) | Best-effort (no guarantee) |
| **Order** | In-order delivery | No ordering guarantee |
| **Overhead** | Higher (headers, acks, retransmits) | Lower |
| **Use cases** | HTTP, HTTPS, SSH, most APIs | Video/audio streaming, DNS (small queries), gaming, real-time where loss is OK |

- **TCP 3-way handshake:** SYN → SYN-ACK → ACK. Tear-down: FIN/ACK.
- **Why front-end cares:** All browser HTTP is over TCP (and TLS on top for HTTPS). Understanding “reliable vs best-effort” helps when discussing WebRTC, WebSockets (over TCP), or streaming.

---

## 5. DNS (Domain Name System)

- **Purpose:** Resolve **domain name** (e.g. `api.example.com`) to **IP address** (e.g. `93.184.216.34`).
- **Flow:** Browser/OS asks resolver (often ISP or 8.8.8.8) → resolver may use cache → recursive resolution from root → TLD → authoritative server → IP returned.
- **Caching:** At OS, browser, resolver; **TTL** (Time To Live) controls how long a record can be cached.
- **Record types:** A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT.
- **Why it matters:** Slow or failed DNS = slow or failed page load; CDN and API domains depend on DNS; understanding “what happens when I type a URL” includes DNS.

---

## 6. Same-origin policy and CORS

### Same-origin policy (SOP)

- **Origin** = protocol + domain + port. Same origin only if all three match.
- **Rule:** A page from origin A can’t read response data from a request to origin B (cross-origin) unless B explicitly allows it (CORS) or it’s a “simple” request and B allows it.

### CORS (Cross-Origin Resource Sharing)

- **Problem:** Browser blocks JS from reading cross-origin responses (e.g. `fetch('https://api.other.com')`) unless the **server** sends the right headers.
- **Server headers that allow origin:**
  - `Access-Control-Allow-Origin: *` or `Access-Control-Allow-Origin: https://your-site.com`
  - For credentialed requests: `Access-Control-Allow-Credentials: true` and specific origin (not `*`).
  - For custom headers / methods: `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`.
- **Preflight:** For “non-simple” requests (custom headers, method other than GET/POST/HEAD, or certain Content-Types), browser first sends **OPTIONS**; server responds with CORS headers; only then does the actual request go.
- **Simple request:** GET/HEAD/POST with simple headers and Content-Type one of `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` (no preflight).
- **Fix “blocked by CORS”:** Configure the **server** (API) to send `Access-Control-Allow-Origin` (and others as needed). Front-end cannot fix it alone (browser enforces).

---

## 7. Cookies, session, and tokens

### Cookies

- **What:** Small key-value data sent by server via `Set-Cookie`; browser sends them back on matching domain/path with every request (`Cookie` header).
- **Attributes:** `HttpOnly` (no JS access, reduces XSS), `Secure` (HTTPS only), `SameSite` (Strict/Lax/None for CSRF), `Max-Age` / `Expires`, `Path`, `Domain`.
- **SameSite:** Lax = send on top-level nav; Strict = only same-site; None = cross-site (requires Secure).

### Session

- **Typical pattern:** Server creates a **session** (server-side store keyed by session ID); sends session ID to client in a **cookie**; client sends cookie back; server looks up session.
- **Where session lives:** Server memory, Redis, DB. Cookie only holds the ID, not the data.

### Tokens (e.g. JWT)

- **JWT:** Signed (often HMAC or RSA) payload (claims) + signature. Client stores token (memory, localStorage, or cookie); sends in `Authorization: Bearer <token>` (or cookie).
- **Stateless:** Server doesn’t store session; it verifies signature and reads claims. Logout = client discards token (or use short-lived access token + refresh token and revoke refresh on logout).
- **Cookie vs localStorage for token:** Cookie with HttpOnly is safer from XSS; SameSite helps with CSRF. localStorage is accessible to JS (XSS can steal it).

---

## 8. WebSockets

- **What:** Full-duplex, single long-lived connection over **TCP**; both sides can send frames anytime after handshake.
- **Handshake:** HTTP upgrade request (`Upgrade: websocket`); server responds with 101 Switching Protocols. Then binary/text frames.
- **Use cases:** Chat, live dashboards, real-time notifications, collaborative apps. Alternative: long polling or Server-Sent Events (SSE) for server→client only.
- **vs HTTP:** HTTP is request-response; WebSocket is persistent connection with bidirectional messages.

---

## 9. REST and API design (high level)

- **REST:** Architectural style: resources as URIs, HTTP methods as actions, stateless, use status codes and representations (e.g. JSON).
- **Conventions:** GET = read, POST = create, PUT/PATCH = update, DELETE = delete; 2xx/4xx/5xx; resource nouns (e.g. `/users`, `/users/1`).
- **Idempotency:** PUT/DELETE idempotent; POST often not. Important for retries and caching.

---

## 10. Load balancing (concept)

- **What:** Distribute incoming requests across multiple servers (or instances) to improve availability and capacity.
- **Strategies:** Round-robin, least connections, IP hash, weighted. Health checks remove unhealthy backends.
- **Where:** In front of app servers (reverse proxy / load balancer). Front-end often talks to one “origin” or API URL that is actually a load balancer.

---

## 11. Relevant headers (quick ref)

| Header | Direction | Meaning |
|--------|-----------|---------|
| Authorization | Request | Bearer token or Basic auth |
| Content-Type | Req/Resp | e.g. application/json |
| Cookie | Request | Cookies for this domain |
| Set-Cookie | Response | Set cookie |
| Cache-Control | Response | No-cache, max-age, etc. |
| Origin | Request | Sending origin (CORS) |
| Access-Control-Allow-Origin | Response | Allowed origin (CORS) |
| X-Requested-With | Request | Sometimes used for CSRF / legacy |

---

## 12. What happens when you type a URL in the browser and press Enter?

This is one of the most famous interview questions. Here is a full step-by-step answer you can give (adjust depth by time and interviewer).

### Step 1: You enter the URL

- You type e.g. `https://www.example.com/page` and press Enter.
- The browser may **normalize** the URL (e.g. add trailing slash, fix scheme) and check **HSTS** (if the site was previously marked HTTPS-only, the browser may go straight to HTTPS).

### Step 2: DNS resolution (URL → IP)

- The browser needs the **IP address** of `www.example.com`. It doesn’t know it yet.
- **DNS lookup:** Browser checks **local cache** (browser + OS). If missing, the OS sends a DNS query to a **resolver** (e.g. ISP or 8.8.8.8).
- Resolver may have it cached; otherwise **recursive resolution**: root server → TLD (.com) → authoritative server for `example.com` → returns the A/AAAA record (IP).
- Result: e.g. `93.184.216.34`. This is cached for **TTL** (Time To Live).

### Step 3: TCP connection (and TLS if HTTPS)

- Browser opens a **TCP** connection to that IP, typically on **port 443** (HTTPS) or 80 (HTTP).
- **TCP 3-way handshake:** SYN → SYN-ACK → ACK. Connection is established.
- If **HTTPS:** **TLS handshake** runs on top: Client Hello → Server Hello + certificate → key exchange → encrypted. Now the channel is encrypted and authenticated.

### Step 4: HTTP request

- Browser sends an **HTTP request** over that connection: e.g. `GET /page HTTP/1.1`, with headers like `Host: www.example.com`, `User-Agent`, `Accept`, `Accept-Language`, and (if any) `Cookie`.
- For HTTPS, this is sent as **encrypted** application data after the TLS handshake.

### Step 5: Server handles the request

- Request hits the **server** (or a **load balancer** in front of it). Server (or upstream app) handles the request: routing, auth, reading from cache/DB, rendering HTML or returning JSON.
- Server sends an **HTTP response**: status (e.g. `200 OK`), headers (e.g. `Content-Type`, `Set-Cookie`, `Cache-Control`), and **body** (HTML, JSON, etc.).

### Step 6: Browser receives and processes the response

- Browser gets the response. If it’s **HTML**:
  - **Parse HTML** → build **DOM**.
  - Encounter `<link>`, `<script>`, `<img>` → may trigger more **requests** (same origin or cross-origin) for CSS, JS, images. These go through the same flow (DNS if new host, TCP/TLS, HTTP). **CORS** applies to cross-origin JS reads.
  - **CSS** is parsed → **CSSOM**. DOM + CSSOM → **render tree**.
  - **JavaScript** is downloaded (if not cached), parsed, and executed. It can change DOM/CSSOM, trigger more requests (e.g. API calls), and register event handlers.
  - **Layout** (position/size) and **paint** (pixels) are computed. **Compositing** and **display** show the page on screen.

### Step 7: After load

- **load** event fires when the page and its subresources (images, etc.) have loaded.
- The connection may stay open (keep-alive) for reuse, or close. User interactions trigger **event handlers**, more **fetch/XHR** calls, or **navigation** (repeat the flow for a new URL).

### Short “elevator” version (30 seconds)

1. **DNS:** Domain → IP.  
2. **TCP + TLS:** Connect to server, establish encrypted channel (HTTPS).  
3. **HTTP:** Send request, get response (e.g. HTML).  
4. **Browser:** Parse HTML → DOM, load CSS/JS/images (more requests), build render tree, layout, paint, display.  
5. **JS runs,** events and further requests happen as the user interacts.

### What to mention in an interview

- **DNS** (caching, TTL), **TCP** (reliable connection), **TLS** (encryption for HTTPS).
- **HTTP request/response**, **status codes**, **headers**.
- **Browser:** parsing, **DOM**, **subresource requests**, **CORS** for cross-origin, **rendering** (layout, paint).
- Optional: **load balancer**, **caching** (browser, CDN), **HTTP/2** (multiplexing), **Service Worker** (if you’ve used one).

---

For **interview Q&A** on these topics, see [NetworkingInterviewQA.md](NetworkingInterviewQA.md).
