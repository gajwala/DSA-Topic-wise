# Networking & OS for Software Engineer Interviews

> As a **front-end engineer** or **full-stack / software engineer**, you’ll often get questions on **networking** and **OS basics** in interviews. This folder covers the topics you need and how to answer them—whether the role is front-end, backend, or general SWE.

---

## Why these topics in interviews?

- **Networking:** Every app uses HTTP, APIs, and the browser’s network stack. Interviewers check that you understand how the web works (HTTP, TLS, CORS, cookies, status codes) and can debug and design around it.
- **OS:** Concurrency, processes vs threads, memory, and the event loop affect both backend (Node, Go, Java) and front-end (browser main thread, Web Workers). Even front-end roles may ask “single-threaded JS” or “how does the event loop work?” which ties to OS concepts.

---

## Folder structure

| File | Contents |
|------|----------|
| [NetworkingConcepts.md](NetworkingConcepts.md) | HTTP/HTTPS, TCP vs UDP, DNS, CORS, TLS, cookies/sessions, status codes, WebSockets, REST, load balancing |
| [NetworkingInterviewQA.md](NetworkingInterviewQA.md) | Networking interview Q&A |
| [OSConcepts.md](OSConcepts.md) | Processes, threads, memory (stack/heap), concurrency, scheduling, deadlock, IPC; ties to event loop and JS |
| [OSInterviewQA.md](OSInterviewQA.md) | OS interview Q&A |

---

## Who gets asked what?

| Role | Networking | OS |
|------|------------|-----|
| **Front-end** | HTTP, CORS, cookies, status codes, REST/APIs, TLS (HTTPS) | Event loop, single-threaded JS, Web Workers |
| **Backend** | All of the above + TCP/UDP, DNS, load balancing, WebSockets | Processes, threads, concurrency, memory, deadlock |
| **Full-stack / SWE** | Broad: HTTP to load balancing | Processes, threads, memory, event loop |

---

## Famous question: “What happens when you type a URL in the browser?”

Full step-by-step answer (DNS → TCP → TLS → HTTP → server → browser parsing, DOM, subresources, layout, paint) is in **[NetworkingConcepts.md § 12](NetworkingConcepts.md#12-what-happens-when-you-type-a-url-in-the-browser-and-press-enter)**. Short and medium answers are in **[NetworkingInterviewQA.md](NetworkingInterviewQA.md)** under the same question.

---

## Quick reference

### Networking (must know)

- **OSI model:** 7 layers (Application → Physical); HTTP = L7, TCP = L4, IP = L3. See [NetworkingConcepts.md § 1](NetworkingConcepts.md#1-osi-model-7-layers).
- **HTTP:** Methods (GET, POST, PUT, PATCH, DELETE), status codes (2xx, 3xx, 4xx, 5xx), request/response headers.
- **HTTPS:** TLS encrypts traffic; handshake; why “secure”.
- **TCP vs UDP:** Reliable vs best-effort; when each is used.
- **DNS:** Resolves domain → IP; caching, TTL.
- **CORS:** Same-origin policy; preflight; how to fix “blocked by CORS”.
- **Cookies vs session vs token:** Where stored, how sent, use cases.

### OS (must know)

- **Process vs thread:** Process = program instance; thread = unit of execution inside process. JS is single-threaded per realm.
- **Memory:** Stack (local vars, call frames) vs heap (objects, dynamic allocation).
- **Concurrency vs parallelism:** Concurrency = overlapping in time; parallelism = actually at the same time (needs multiple cores/threads).
- **Event loop:** Single thread + queue; why async doesn’t block; microtasks vs macrotasks.
- **Deadlock:** Mutual wait on resources; how to avoid (ordering, timeouts).

---

## Related in this repo

- **System design (deeper networking):** [../system-design-interview/02-networking-fundamentals.md](../system-design-interview/02-networking-fundamentals.md) – OSI, IP, DNS, proxies, load balancers, WebSockets in more detail.
