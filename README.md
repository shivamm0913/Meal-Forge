# 🍳 Meal Forge

> An intelligent full-stack AI meal planning, recipe generation, and pantry management platform built with React 19, Tailwind CSS v4, Express 5, and PostgreSQL.

---

## 🌟 Features

- **Pantry Inventory Tracking**: Log ingredients, monitor categories, and get 7-day expiration alerts.
- **AI Recipe Generator**: Generate chef-crafted recipes tailored to your diet, cooking time, and in-stock pantry items.
- **Weekly Meal Planner**: Schedule breakfast, lunch, and dinner across an interactive 7-day calendar.
- **Smart Shopping List**: Automatically calculates grocery lists by subtracting ingredients already present in your pantry.
- **1-Click Pantry Restock**: Check off purchased groceries and transfer them directly back into your pantry.
- **Nutritional Macros**: View estimated calories, protein, carbohydrates, and fats for every recipe.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Axios, date-fns, react-hot-toast
- **Backend**: Node.js, Express 5, PostgreSQL (`pg`), JWT, Bcrypt.js, Google GenAI SDK (`gemini-2.5-flash`)
- **Database**: PostgreSQL (Neon Serverless) with UUIDv4, row-level triggers, and transactions

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "Meal Forge"
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your DATABASE_URL, JWT_SECRET, and GEMINI_API_KEY in .env

# Run database migrations
node migrate.js

# Start backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api

# Start frontend dev server
npm run dev
```

Open `http://localhost:5173` to explore the app.
