# 🚀 TaskPilot | Full-Stack Task Manager

A clean, modern, full-stack Task Management web application. Built using the **MERN Stack** (MongoDB, Express, React, Node.js), this platform features secure user authentication, a responsive Kanban-style task board, and smooth data sorting.

### 🌐 Live Links
* **Live Website (Frontend):** [👉 View Live App](https://task-manager-tau-snowy-58.vercel.app/)
* **Live Server API (Backend):** [🔗 API Link](https://task-manager-api-one-beta.vercel.app/)

---

## ⚡ Key Features

### 🔐 Accounts & Security
* **Register & Login:** Secure user onboarding using modern password encryption (`bcrypt`) and secure login tokens (JWT).
* **Stay Logged In:** The app remembers your session. If you refresh the page, it validates your token and keeps you logged in automatically.
* **User Profiles:** A dedicated dashboard page where users can update their personal information and change their passwords securely.

### 📋 Task Management (Kanban Board)
* **Full CRUD Control:** Create, read, update, and delete tasks instantly.
* **3-Stage Workflow:** Move tasks smoothly through **Todo ➡️ In Progress ➡️ Done**.
* **Progress Tracking:** Real-time counters showing your total tasks, pending tasks, and completed tasks at a glance.

### 🎛️ Dynamic Sorting & Priorities
* **Sort Tasks:** Sort your workspace instantly by **Newest First** or **Oldest First**.
* **Priority Levels:** Assign a **High, Medium, or Low** priority tag to any task to manage your urgency.

### 🎨 User Experience
* **Responsive Design:** Looks beautiful and fits perfectly on desktops, tablets, and mobile phones.
* **Instant Feedback:** Shows loading spinners during network requests and uses clean pop-up notifications (`react-toastify`) for success or error messages.

---

## 🧠 System Architecture & Tradeoffs

This project was engineered to be clean, stable, and completely modular under a tight 3-to-4 hour assignment window.

### 🏛️ Engineering Decisions
* **Real Backend Instead of Mock Data:** To fully meet the technical criteria for utilizing AI assistance during development, I built a genuine custom Node.js backend server instead of faking the data on the frontend.
* **Clean Code Structure:** The backend logic is strictly separated into dedicated folders (`routes`, `controllers`, `models`, and `middleware`) to ensure the codebase is readable and easy to scale.
* **Standard JWT Auth:** Avoided heavy third-party packages to write standard, native JSON Web Token auth. Tokens are stored locally and sent securely with every request headers.
* **Serverless Deployment:** Configured using a `vercel.json` file so that the Express backend executes perfectly as lightweight serverless functions on Vercel.

### 🔄 Tradeoffs Made
* **Buttons over Drag-and-Drop:** To guarantee absolute stability and prevent layout bugs on smaller mobile touchscreens under a tight deadline, tasks are shifted between stages using simple, precise buttons instead of heavy drag-and-drop code.
* **Text-Only Modals:** Kept creation and editing modals completely text and option-driven. Skipping image uploads keeps database payloads lightweight and ensures lightning-fast load times.

### 📋 Project Assumptions
* **100% Private Tasks:** Every user can only see the tasks they created. Tasks are linked to a specific user ID in MongoDB and are protected behind secure authentication checks.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS & Lucide Icons
* **HTTP Client:** Axios (API communication)
* **Backend:** Node.js & Express.js
* **Database:** MongoDB Atlas (Cloud Database)
* **Database Modeling:** Mongoose ODM
* **Security:** JWT & Bcrypt

---

## 📦 Local Installation & Setup

Get this project running on your local machine in three steps:

### 1. Clone the Project
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME

## Setup the Backend
Bash
cd Backend
npm install
Create a file named .env inside the Backend folder and add your credentials:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=development
Start the backend development server:

Bash
npm run dev
3. Setup the Frontend
Open a new terminal window, navigate back to the root directory, and run:

Bash
cd Frontend
npm install
Create a file named .env inside the Frontend folder and link your local backend URL:

Code snippet
VITE_API_URL=http://localhost:5000
Start the frontend user interface:

Bash
npm run dev
