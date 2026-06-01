# 🚀 TaskPilot | Full-Stack Task Management Platform

An elegant, production-ready, full-stack Task Management application built to manage workflows seamlessly across multiple stages. Built with the **MERN Stack** (MongoDB, Express, React, Node.js), this platform features robust custom JWT authentication, modular serverless architecture, and a fully responsive user interface.

### 🌐 Live Deployments
* **Frontend Client:** https://task-manager-tau-snowy-58.vercel.app/
* **Backend API Base:** https://task-manager-api-one-beta.vercel.app/

---

## ⚡ Core Engineering & Platform Features

### 🔐 Robust Identity & Session Management
* **Secure Authentication Pipeline:** Multi-step user authentication featuring deterministic data salting and password hashing via `bcrypt` alongside secure stateless token creation with JSON Web Tokens (JWT).
* **Automated Session Restoration:** Zero-friction UX utilizing React lifecycle hooks to query the `/api/user/me` endpoint. Valid tokens automatically bypass the login screen and instantly re-hydrate the global user context.
* **Granular User Profiles:** Dedicated profile dashboard allowing authenticated users to dynamically update personal accounts, modify display configurations, and securely cycle account passwords.

### 📋 High-Performance Kanban & Task Management
* **Full CRUD Operations:** Seamless, real-time Create, Read, Update, and Delete actions connected to optimized MongoDB document models.
* **State-Driven Workflow Pipeline:** Highly visual three-stage pipeline (Todo ➡️ In Progress ➡️ Done) leveraging local state synchronization to eliminate artificial interface delays.
* **Progress Telemetry Indicators:** Real-time completion analytics tracking total tasks against current status metrics (e.g., Pending vs. Completed) to present a high-level view of workflow velocity.

### 🎛️ Advanced Data Engineering (Sorting & Prioritization)
* **Chronological Sorting Engines:** Dynamic client-side sorting capabilities enabling users to instantly pivot their workspace arrays between `Newest First` (high-velocity tracking) and `Oldest First` (backlog management).
* **Multi-Tier Prioritization Matrix:** Task schemas enriched with structural priority tagging (e.g., High, Medium, Low), allowing users to organize tasks by urgency and prevent bottlenecking.

### 🎨 Production-Grade UX & Resilience
* **Fail-Safe UI States:** Full-coverage loading spinners and contextual fallback states that gracefully handle slow network conditions.
* **Reactive Toast Infrastructure:** Integrated `react-toastify` notification layer providing instant, non-intrusive feedback on server communications, validation errors, and state mutations.

---
## 🧠 System Architecture, Tradeoffs, & Engineering Assumptions

To deliver a production-ready system within a highly compressed 3-to-4 hour window, architectural choices were guided by two core pillars: **absolute system stability** and a **strict separation of concerns**. 

---

### 🏛️ Technical & Architectural Decisions

> 💡 **Architectural Strategy:** The entire platform is built around a decoupled full-stack architecture, optimizing for modular scale, easy debugging, and predictable data flow.

* **Mandatory AI-Assisted Full-Stack Pipeline:** Adhering strictly to the assignment criteria regarding AI-assisted workflows, I engineered a dedicated custom Node.js/Express backend rather than relying on brittle, frontend-mocked static state storage. 
* **Strict Separation of Concerns (SoC):** The backend bypasses chaotic single-file scripts in favor of a clean, decoupled MVC pattern:
  * 📁 `config/` — Isolated database connectivity initialization.
  * 📁 `middleware/` — Request filtration, payload parsing, and authentication interceptors.
  * 📁 `routes/` — Explicit endpoint mapping.
  * 📁 `controllers/` — Core transactional business logic.
* **Standard JWT Lifecycle Over Third-Party Wrappers:** I bypassed heavy, opinionated authentication frameworks (like Passport.js) to implement standard, lightweight **JSON Web Token (JWT)** auth manually. Tokens are managed securely in `localStorage` and automatically injected into outbound requests via an Axios authorization header interceptor:
  ```javascript
  Authorization: Bearer <token>
---

## 🛠️ Tech Stack & Ecosystem

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | High-speed single-page application framework. |
| **Styling** | Tailwind CSS | Utility-first, responsive grid interface design. |
| **Icons** | Lucide React | Modern, lightweight vector iconography. |
| **State/API** | Axios | Promise-based HTTP client handling async requests. |
| **Backend** | Node.js / Express.js | Scalable, non-blocking asynchronous routing backend. |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL document database. |
| **ODM** | Mongoose | Structural data modeling and schema validation. |
| **Security** | Bcrypt & JWT | Password salting/hashing and tokenized sessions. |

---

## 📦 Local Installation & Setup

Follow these steps to spin up the environment locally:

### 1. Repository Preparation
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
