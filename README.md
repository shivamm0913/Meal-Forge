<div align="center">

  <img src="frontend/public/mealForge.png" alt="Meal Forge Logo" width="100" height="100" style="border-radius: 50%;" />

  # 🍳 Meal Forge
  ### Intelligent AI Meal Planning, Recipe Generation & Pantry Management System

  [![Live Demo](https://img.shields.io/badge/Live_Demo-meal--forge--theta.vercel.app-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://meal-forge-theta.vercel.app/)
  [![React 19](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Node Express 5](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
  [![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8e75ff?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

  <p align="center">
    <strong>A unified, closed-loop kitchen ecosystem that turns on-hand ingredients into chef-crafted meals, eliminates household food waste, and calculates grocery lists with pantry deficit deduction.</strong>
  </p>

  <p align="center">
    <a href="https://meal-forge-theta.vercel.app/"><strong>Explore Live Demo »</strong></a>
    <br />
    <br />
    <a href="#-the-closed-loop-solution">How It Works</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-local-development-setup">Setup Guide</a> •
    <a href="#-database-schema">Database Schema</a>
  </p>

</div>

---

## 🌐 Live Application

👉 **Try the live app now:** **[https://meal-forge-theta.vercel.app](https://meal-forge-theta.vercel.app/)**

*Deployed on **Vercel** (Frontend) and **Neon** (PostgreSQL Serverless), powered by **Google Gemini AI**.*

---

## 💡 The Problem & The Closed-Loop Solution

### The Challenge
- **Food Waste**: Up to 30% of household groceries spoil in refrigerators because ingredients expire unnoticed.
- **Decision Fatigue**: Answering *"What should I cook tonight?"* with disjointed ingredients on hand is frustrating.
- **Disconnected Tools**: Traditional recipe websites don't know what's in your pantry, and grocery list apps don't calculate what you already own.

### The Meal Forge Loop
Meal Forge bridges the gap between what you have, what you plan to eat, and what you need to buy:

```
 ┌─────────────────────────────────────────────────────────────┐
 │                      MEAL FORGE CYCLE                       │
 └─────────────────────────────────────────────────────────────┘
   [Pantry Inventory] ──────────► [AI Recipe Generator (Gemini)]
          ▲                                      │
          │ (1-Click Auto-Restock)               ▼
   [Smart Shopping List] ◄──────── [Weekly Meal Planner]
    (Deficit = Needed - InStock)
```

1. **Inventory Track**: Monitor ingredient stock and receive automatic warnings for items expiring within 7 days.
2. **AI Recipe Forge**: Generate step-by-step recipes tailored to in-stock items, cooking times, and dietary restrictions.
3. **Weekly Schedule**: Assign breakfast, lunch, and dinner across an interactive 7-day calendar.
4. **Smart Grocery Deficit**: Automatically aggregate ingredients across the week and **subtract items already in stock**.
5. **One-Click Restock**: Check off purchased groceries and transfer them straight into your active pantry inventory.

---

## 🌟 Key Features

### 🥘 1. AI-Powered Recipe Generator
- Toggle **"Use ingredients from my pantry"** to dynamically craft meals from available stock.
- Filter by cuisine (Italian, Mexican, Indian, Chinese, Japanese, Thai, Mediterranean, etc.).
- Enforce dietary constraints (Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Paleo).
- Select preparation time (Quick `<30 min`, Medium `30-60 min`, Long `>60 min`) and portion sizes (1 to 12 servings).
- Generates complete instructions, ingredient quantities, cooking tips, and nutritional macros (Calories, Protein, Carbs, Fats, Fiber).

### 📦 2. Virtual Pantry & 7-Day Expiry Watchdog
- Track ingredients by category (Vegetables, Fruits, Dairy, Meat, Grains, Spices, Other).
- Automated warning alerts highlight items expiring within 7 days so you cook perishables first.
- Instant search and category filtering.

### 📅 3. Interactive Weekly Meal Planner
- 7-day visual calendar grid covering Breakfast, Lunch, and Dinner.
- Seamless week-to-week pagination powered by `date-fns`.
- Atomic PostgreSQL upsert scheduling (`ON CONFLICT (user_id, meal_date, meal_type) DO UPDATE`) prevents duplicate slot collisions.

### 🛒 4. Smart Shopping List with Deficit Deduction
- Aggregates ingredients across scheduled meals using SQL: `SUM(quantity) GROUP BY ingredient, unit`.
- Compares required items with active pantry inventory using an in-memory hash map.
- Calculates net deficit: `Deficit = max(0, Needed - InStock)` so you never buy duplicate groceries.
- **1-Click Restock**: Check off bought items and move them directly into your pantry inventory in a single atomic database transaction.

### 📖 5. Recipe Collection & Real-Time Portion Scaler
- Save favorite recipes to your personal cookbook.
- Dynamic portion scaler adjusts ingredient quantities in real-time ($Q_{\text{new}} = \frac{Q_{\text{orig}} \times S_{\text{new}}}{S_{\text{orig}}}$) without extra network calls.
- Interactive cooking checklist to check off steps as you prepare meals.

### ⚙️ 6. User Profile & Dietary Defaults
- Configure persistent dietary preferences, allergies, preferred cuisines, and default family portion sizes.
- Preferences automatically pre-populate the recipe generator on every visit.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React 19** | Latest React SPA with modern hooks and state management |
| **Build Tool** | **Vite** | Lightning-fast development server & optimized Rollup build |
| **Styling** | **Tailwind CSS v4** | Clean, responsive UI built with `@tailwindcss/vite` |
| **Icons** | **Lucide React** | High-performance, accessible icon suite |
| **Routing** | **React Router v7** | Client-side routing with `ProtectedRoute` guards and Vercel rewrites |
| **HTTP Client** | **Axios** | Configured with automatic JWT Bearer token injection and 401 interceptors |
| **Backend** | **Node.js + Express 5** | RESTful API with native promise handling and centralized error pipeline |
| **Database** | **PostgreSQL (Neon)** | Serverless database with UUIDv4, row-level triggers, indexes, and transactions |
| **AI Engine** | **Google GenAI SDK** | `gemini-2.5-flash` with native JSON mode schema enforcement |
| **Security** | **JWT & Bcrypt.js** | Stateless authentication tokens paired with 10-round salted password hashes |

---

## 🗄️ Database Schema

The database utilizes **8 normalized relational tables** in PostgreSQL:

- **`users`**: Account credentials, salted password hash, name, timestamps.
- **`user_preferences`**: 1-to-1 profile preferences (dietary restrictions, allergies, cuisines, default servings).
- **`pantry_items`**: User inventory, quantities, units, categories, and expiration dates.
- **`recipes`**: Base recipe records, cook time, difficulty, JSONB instructions, dietary tags.
- **`recipe_ingredients`**: Normalized 1-to-many ingredients linked to recipes.
- **`recipe_nutrition`**: 1-to-1 nutritional facts (calories, protein, carbs, fats, fiber).
- **`meal_plans`**: Weekly meal schedule with `UNIQUE(user_id, meal_date, meal_type)`.
- **`shopping_list_items`**: Categorized grocery items with toggleable checkmarks.

*All tables implement row-level triggers (`update_updated_at_column`) and B-Tree indexes on foreign keys and search fields.*

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: Local instance or a free cloud database on [Neon.tech](https://neon.tech)
- **Google Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/shivamm0913/Meal-Forge.git
cd Meal-Forge
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create your .env file
cp .env.example .env
```

Configure `backend/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key_here
```

Run database migration:
```bash
node migrate.js
```

Start backend development server:
```bash
npm run dev
# API running at http://localhost:5000
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install

# Create your .env file
cp .env.example .env
```

Configure `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend development server:
```bash
npm run dev
# App running at http://localhost:5173
```

---

## 🚢 Deployment

- **Frontend**: Deployed on **[Vercel](https://vercel.com/)** with root directory `frontend` and [`vercel.json`](frontend/vercel.json) client rewrite rule.
- **Backend**: Deploy on **[Render](https://render.com/)** as a Web Service with root directory `backend`, build command `npm install`, and start command `node server.js`.
- **Database**: Hosted on **[Neon](https://neon.tech/)** serverless PostgreSQL.

---

## 📄 License

This project is licensed under the ISC License.
