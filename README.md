# 📊 FinTrack: Personal Finance Dashboard

FinTrack is a comprehensive and responsive financial management application built using **React**, **Tailwind CSS**, and **Recharts**. It provides users with an intuitive interface to track balances, analyze spending patterns, and manage transactions with a simulated Role-Based Access Control (RBAC) system.

---

## 🚀 Live Demo

👉 [View Live App](https://zorvyn-fin-track.vercel.app/)

---

## ✨ Features

### 1. 📈 Dynamic Dashboard Overview

* **Summary Cards:** Displays real-time Total Balance, Monthly Income, and Monthly Expenses
* **Balance Trend:** Interactive Area Chart to visualize financial growth over time
* **Spending Breakdown:** Doughnut Chart (Chart.js) showing category-wise expense distribution

---

### 2. 📋 Transaction Management

* **Full Ledger:** View all transactions with Date, Description, Category, and Amount
* **Search & Filters:** Quickly find transactions using search, category filter, and sorting

---

### 3. 🔐 Role-Based UI (RBAC Simulation)

* **Admin Role:** Full access to add, edit, and delete transactions
* **Viewer Role:** Read-only access with restricted actions
* **Role Toggle:** Switch roles easily from the AppBar dropdown

---

### 4. 🎨 Advanced UI/UX

* **Custom Preloader:** Water-fill animation with loading progress (1% → 100%)
* **Responsive Design:** Mobile-first layout with drawer menu and adaptive charts
* **Dark Mode:** System-aware theme with manual toggle and persistence
* **State Management:** Centralized data flow using React Context API

---

## 🛠️ Tech Stack

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Charts:** Recharts, Chart.js
* **Routing:** React Router DOM v6
* **Animation:** CSS Keyframes, Framer Motion (optional)

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/SurajitM0nd0l/Zorvyn_FinTrack.git

# Navigate to project folder
cd Zorvyn_FinTrack

# (Optional) If frontend is inside a folder
cd Frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 📖 Approach & Architecture

### 🧩 Component Modularity

* Follows an **Atomic Design structure**
* Reusable components like **Charts, StatCards, Sidebar, and AppBar** are stored in `/components`
* Full-page views like **Dashboard** and **Analytics** are organized inside `/pages`

---

### 🔄 State Management

* Implemented **React Context API (`AppContext.jsx`)** for global state handling
* Manages **transactions** and **user roles** centrally
* Ensures real-time UI updates (charts, summaries) without **prop drilling**

---

### 📱 Responsive Strategy

* Built with **Tailwind CSS breakpoints** (`sm`, `md`, `lg`, `xl`)
* Mobile-first design → single-column layout on small screens
* Multi-column grid layout for larger screens
* Charts use **ResponsiveContainer** for automatic scaling and proper aspect ratios

---
