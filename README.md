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

## 🧠 Architectural Decisions, Assumptions, & Tradeoffs

### 🏛️ Technical & Architectural Decisions
* **Mandatory AI-Assisted Backend:** In strict adherence to the assignment guidelines regarding AI assistance, I designed and built a dedicated custom backend rather than relying purely on frontend-mocked states.
* **Strict Separation of Concerns (SoC):** The backend is architected using a decoupled MVC-style layout (`routes/`, `controllers/`, `config/`, `middleware/`). This structure guarantees high maintainability and isolates routing logic from the core database operations.
* **Standard JWT Lifecycle Over Wrappers:** I bypassed heavy third-party authentication wrappers (like Passport.js) to implement standard Google-style JWT authentication manually. Tokens are stored in `localStorage` and dispatched via an Axios authorization interceptor header (`Authorization: Bearer <token>`).
* **Serverless Node.js Execution:** Deployed the Express layer to Vercel as modular Serverless Functions (`vercel.json`), exporting the application instance (`export default app`) directly rather than managing raw persistent port listeners.

### 🔄 Engineering Tradeoffs
* **Button/Dropdown UI vs. Drag-and-Drop:** To guarantee a strict completion timeline (under 4 hours) and avoid layout-shift bugs on mobile screens, I implemented standard, precise button-based stage transitions. This prioritized absolute stability and ironclad responsiveness over an intricate drag-and-drop third-party package.
* **Text-Only Modals:** Kept modal interfaces entirely content-driven and lightweight. Omitting complex media uploads or rich-text editors dramatically accelerated request-response roundtrips and eliminated unnecessary payload overhead.

### 📋 Technical Assumptions
* **User Data Isolation:** It is assumed that all task items are strictly private. The database utilizes a relational reference (`user_id` bound to the `Task` schema) ensuring that tasks are filtered at the database level and can only be accessed via an authenticated user token context.
* **Fixed Workflow Pipeline:** The workspace pipeline is assumed to follow a standard MVP "Todo ➡️ In Progress ➡️ Done" framework without custom user-defined stages.

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
