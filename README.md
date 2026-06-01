# 🚀 TaskFlow | Full-Stack Task Management Platform

An elegant, production-ready, full-stack Task Management application built to manage workflows seamlessly across multiple stages. Built with the **MERN Stack** (MongoDB, Express, React, Node.js), this platform features robust custom JWT authentication, modular serverless architecture, and a fully responsive user interface.

### 🌐 Live Deployments
* **Frontend Client:** [👉 Click Here to View Live App](YOUR_FRONTEND_VERCEL_URL)
* **Backend API Base:** [🔗 API Endpoint Link](YOUR_BACKEND_VERCEL_URL)

---

## ⚡ Key Features
* **Full-Stack Authentication:** Secure user registration and login utilizing custom JSON Web Tokens (JWT) and `bcrypt` password hashing.
* **Persistent Sessions:** Automated session restoration using token validation endpoints (`/api/user/me`) via React lifecycle hooks.
* **State-Driven Kanban Board:** Responsive three-stage pipeline (Todo ➡️ In Progress ➡️ Done) optimized for cross-device usage.
* **Fail-Safe UI States:** Comprehensive loading animations, error boundary state tracking, and reactive notification toasts via `react-toastify`.

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
