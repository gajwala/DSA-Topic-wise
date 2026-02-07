# Networking Interview Q&A

> Common networking questions in front-end, backend, and full-stack interviews, with short answers. Use with [NetworkingConcepts.md](NetworkingConcepts.md) for detail.

---

## OSI model

### What is the OSI model? What are the 7 layers?

The **OSI (Open Systems Interconnection) model** is a **7-layer** conceptual framework that describes how data moves across a network from one application to another. The layers (top to bottom): **7 Application** (HTTP, FTP, DNS) — **6 Presentation** (encryption, format) — **5 Session** (session management) — **4 Transport** (TCP, UDP) — **3 Network** (IP, routing) — **2 Data Link** (Ethernet, MAC) — **1 Physical** (cables, Wi-Fi). Mnemonic: *All People Seem To Need Data Processing*. In interviews, “Which layer is HTTP?” → Layer 7. “TCP/UDP?” → Layer 4. “IP?” → Layer 3.

### At which OSI layer do HTTP and TCP operate?

**HTTP** is **Layer 7 (Application)**. **TCP** is **Layer 4 (Transport)**. TLS/SSL is often associated with Layer 6 (Presentation) for encryption.

---

## HTTP

### What is the difference between GET and POST?

**GET** is for reading; parameters in URL (query string); idempotent and safe; cacheable. **POST** is for creating or submitting data; body typically in request; not necessarily idempotent; not cached by default. Use GET for fetches, POST for forms and actions that change state.

### What are idempotent and safe HTTP methods?

**Safe:** No change to server state (GET, HEAD). **Idempotent:** Doing the same request multiple times has the same effect as once (GET, PUT, DELETE, HEAD; POST and PATCH are not required to be idempotent).

### Explain common HTTP status codes.

- **200 OK** – Success. **201 Created** – Resource created. **204 No Content** – Success, no body.
- **301** – Permanent redirect (update links). **302** – Temporary redirect. **304** – Not modified (use cache).
- **400** – Bad request (client error). **401** – Unauthorized (not authenticated). **403** – Forbidden (authenticated but not allowed). **404** – Not found. **429** – Too many requests (rate limit).
- **500** – Server error. **502** – Bad gateway (upstream failed). **503** – Service unavailable.

### What is the difference between 401 and 403?

**401 Unauthorized** = “Who are you?” — missing or invalid authentication. **403 Forbidden** = “I know you, but you’re not allowed to do this” — authenticated but lacking permission.

### What is HTTPS? How does it relate to TLS?

**HTTPS** is HTTP over **TLS**. TLS provides encryption in transit, server (and optionally client) authentication via certificates, and integrity. The handshake negotiates keys; then application data is encrypted. Use HTTPS for all production traffic.

---

## TCP / UDP / DNS

### What is the difference between TCP and UDP?

**TCP** is connection-oriented, reliable (retransmits, in-order), with higher overhead — used for HTTP, HTTPS, SSH. **UDP** is connectionless, best-effort (no guarantee of delivery or order), lower overhead — used for DNS, streaming, gaming, real-time when some loss is acceptable.

### What is DNS? Why is it important?

**DNS** resolves domain names to IP addresses. When you open a URL, the browser/OS uses DNS to get the IP before connecting. Caching (browser, OS, resolver) and TTL control how long results are reused. Slow or failed DNS means slow or broken page load.

### What happens when you type a URL in the browser and press Enter?

**Short answer:** (1) **DNS** resolves the domain to an IP. (2) Browser opens a **TCP** connection (and does a **TLS** handshake if HTTPS). (3) It sends an **HTTP request** (e.g. GET). (4) Server responds with an **HTTP response** (e.g. HTML). (5) Browser **parses** the HTML into a **DOM**, loads **subresources** (CSS, JS, images) — each may trigger more DNS/TCP/HTTP — applies CSS to build a **render tree**, runs **JavaScript**, does **layout** and **paint**, and displays the page. (6) After that, user interactions and JS can trigger more requests or navigation.

**Details to mention if asked:** DNS uses caches (browser, OS, resolver) and TTL. TCP is a 3-way handshake (SYN, SYN-ACK, ACK). For HTTPS, TLS encrypts the channel before HTTP. The browser may hit a **load balancer**; CORS applies to cross-origin subresource requests. For a full step-by-step breakdown, see **[NetworkingConcepts.md § 12 – What happens when you type a URL](NetworkingConcepts.md#12-what-happens-when-you-type-a-url-in-the-browser-and-press-enter)**.

---

## CORS and security

### What is CORS? Why do we get “blocked by CORS”?

**CORS (Cross-Origin Resource Sharing)** is how the server tells the browser it allows cross-origin requests from a given origin. **Same-origin policy** blocks JS from reading cross-origin responses unless the **server** sends CORS headers (e.g. `Access-Control-Allow-Origin`). “Blocked by CORS” means the API did not send those headers for your origin. **Fix on the server** (add allow-origin, allow-headers, allow-methods as needed). The front-end cannot fix it alone.

### What is a preflight request? When does the browser send it?

A **preflight** is an **OPTIONS** request the browser sends before certain cross-origin requests. It happens for non-simple requests: custom headers, methods other than GET/POST/HEAD, or Content-Type other than the few “simple” ones. The server must respond with CORS headers; then the browser sends the actual request.

### What is the same-origin policy?

**Origin** = protocol + domain + port. The **same-origin policy** says that a page from origin A cannot read the response body of a request to origin B (cross-origin) unless B explicitly allows it via CORS (or it’s a same-origin request).

### How do you secure cookies (XSS, CSRF)?

- **XSS:** Use `HttpOnly` so JS can’t read the cookie; sanitize inputs and escape output.
- **CSRF:** Use `SameSite` (Strict or Lax); or CSRF tokens in forms/headers; or require custom header that only your JS can set (and CORS restricts who can send it).

---

## Cookies, session, tokens

### What is the difference between cookie, session, and token (e.g. JWT)?

- **Cookie:** Small data stored by the browser, sent with requests to matching domain. Often used to hold a **session ID** or a token.
- **Session:** Server-side state keyed by session ID. Server sends session ID in a cookie; client sends it back; server looks up session. State lives on the server.
- **Token (JWT):** Signed payload (claims). Client stores it (cookie or memory/localStorage) and sends it (e.g. `Authorization: Bearer <token>`). Server verifies signature and uses claims; no server-side session store for the token itself (stateless).

### Should you store JWT in localStorage or cookie?

**Cookie (with HttpOnly and Secure):** Not readable by JS, so harder to steal via XSS; use **SameSite** to reduce CSRF. **localStorage:** Readable by JS; if there’s XSS, the token can be stolen. Prefer **HttpOnly cookie** for tokens when possible; if you use localStorage, mitigate XSS strictly.

### What are HttpOnly and Secure cookie attributes?

**HttpOnly:** Browser sends the cookie but JS cannot read it (reduces XSS theft). **Secure:** Cookie only sent over HTTPS. Use both for sensitive cookies in production.

---

## APIs and WebSockets

### What is REST?

**REST** is an architectural style: resources as URIs, HTTP methods as actions (GET read, POST create, PUT/PATCH update, DELETE delete), stateless requests, use of status codes and representations (e.g. JSON). APIs that follow these conventions are often called “RESTful.”

### When would you use WebSockets instead of HTTP?

Use **WebSockets** when you need **persistent, bidirectional** communication: chat, live feeds, real-time dashboards, collaborative editing. Use **HTTP** for request-response (load data, submit form, one-off API calls). For server→client only, **Server-Sent Events (SSE)** is an alternative.

### What is the difference between HTTP/1.1 and HTTP/2?

**HTTP/2:** Multiplexing (many streams over one connection), binary framing, header compression (HPACK). **HTTP/1.1:** Typically one request per connection (or limited parallelism via multiple connections), text headers. HTTP/2 reduces latency and connection overhead when many resources are loaded.

---

## One-liners (quick recall)

- **GET vs POST:** GET = read, in URL, idempotent/safe; POST = create/submit, in body.
- **401 vs 403:** 401 = not authenticated; 403 = authenticated but not allowed.
- **TCP vs UDP:** TCP = reliable, ordered; UDP = best-effort, low overhead.
- **CORS:** Server must send `Access-Control-Allow-Origin` (and related) for cross-origin reads; fix on server.
- **Preflight:** OPTIONS request for non-simple cross-origin requests; server responds with CORS headers.
- **Cookie security:** HttpOnly (no JS), Secure (HTTPS), SameSite (CSRF).
- **Session vs JWT:** Session = server state + ID in cookie; JWT = signed token, stateless.
- **WebSockets:** Full-duplex over one TCP connection; for real-time two-way communication.
