# 🛡️ Finguard: Personal Budget Planner

Finguard is a web-based personal finance management tool designed to empower users with effective budgeting, expense tracking, and financial goal-setting capabilities. Developed using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**, Finguard offers an intuitive and user-friendly interface that simplifies personal finance management, making it accessible even to individuals with minimal financial expertise.

---

## 📸 Application Screenshots

Here are some previews of the Finguard: Personal Budget Planner in action:

### 🏠 Main Page
![Main Page](./project/mainpage.png)

### 📊 Dashboard
![Dashboard](./project/dashboard.png)

### 💸 Income Page
![Income Page](./project/incomepage.png)

### 🧾 Expense Page
![Expense Page](./project/expensepage.png)

### 💰 Savings Page
![Savings Page](./project/savingspage.png)

### 🎯 Goal Page
![Goal Page](./project/goalpage.png)

### 🏦 Investment Page
![Investment Page](./project/investmentpage.png)

### 🛡️ Insurance Page
![Insurance Page](./project/insurancepage.png)

---

## 🔍 Overview

Managing personal finances can be challenging, especially without a structured approach. Finguard addresses this by providing a platform where users can:

- **Record Income Sources:** Log various income streams for comprehensive tracking.
- **Categorize Expenses:** Organize expenditures into categories like groceries, housing, transportation, etc.
- **Track Savings:** Monitor savings and set aside funds for future goals.
- **Set Financial Goals:** Define objectives such as "Vacation Fund" or "Emergency Savings" with target amounts and deadlines.
- **Gain Investment & Insurance Insights:** Access information on various investment options and insurance plans to make informed decisions.

By offering visual summaries and insights into spending patterns, Finguard aids users in making informed budget decisions and developing better money management habits.

---

## 🧰 Features

- 🔐 **User Authentication:** Secure registration and login system with hashed passwords.
- 📊 **Dashboard:** Overview of total income, expenses, savings, and remaining budget, complemented by bar and pie charts for visual analysis.
- 💼 **Expense Management:** Set budgets for different categories and receive alerts when expenditures exceed set limits.
- 🎯 **Savings Goals:** Define financial goals with target amounts and track progress over time.
- 📈 **50/30/20 Budgeting Rule:** Recommendations based on the popular budgeting rule to allocate income effectively.
- 📚 **Investment & Insurance Information:** Details on various investment options like Bonds, Mutual Funds, Stocks, and insurance plans including Health, Life, Home, and more.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (TypeScript), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Development Tools:** Visual Studio Code, npm

---

## 🛠️ How to Run the Project Locally

### ⚙️ Setup Backend (Node.js + Express)

1. Step into the server directory:
   ```bash
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

   🔑 You can get a free MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4. Start the backend server:
   ```bash
   node server.js
   ```

   The backend will run at: `http://localhost:5000`

---

### 🌐 Setup Frontend (Vite + React)

1. Step into the client directory:
   ```bash
   cd ../src
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The frontend will usually run at: `http://localhost:5173`

---

## 📊 Methodology

Finguard's development followed a structured approach:

- **User Registration & Login:** Secure authentication system ensuring data privacy.
- **Dashboard Implementation:** Real-time data visualization for income, expenses, and savings.
- **Expense & Income Tracking:** Categorization and monitoring of financial transactions.
- **Goal Setting & Recommendations:** Tools to define financial goals and receive monthly contribution suggestions.
- **Investment & Insurance Modules:** Informative sections guiding users on various financial products.

---

## 📄 Publication

This project is detailed in the paper:

**Finguard: Personal Budget Planner – A Web-Based Solution for Financial Management and Literacy**  
*Aditya Kaloji, Vaibhavi Girkar, Narendra Gurav, Vishal Khanvilkar*  
Published in **International Research Journal of Engineering and Technology (IRJET)**, Vol. 12, Issue 04, April 2025.

📖 [Read the full paper](https://www.irjet.net/archives/V12/i4/IRJET-V12I4180.pdf)

---

Feel free to ⭐ this repo, open issues, or contribute!
