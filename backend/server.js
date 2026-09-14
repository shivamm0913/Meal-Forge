import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pantryRoutes from "./routes/pantryRoutes.js";
import mealPlansRoutes from "./routes/mealPlansRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import shoppingListRoutes from "./routes/shoppingListRoutes.js";

dotenv.config();

// Validate required environment variables
const REQUIRED_ENV = ["DATABASE_URL", "JWT_SECRET", "GEMINI_API_KEY"];
REQUIRED_ENV.forEach((envName) => {
  if (!process.env[envName]) {
    console.error(`FATAL ERROR: Environment variable "${envName}" is required but missing!`);
    process.exit(1);
  }
});

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test route
app.get("/", (req, res) => {
  res.json({ message: "AI Recipe Generator API" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/meal-plans", mealPlansRoutes);
app.use("/api/shopping-list", shoppingListRoutes);

// centralized error handler (must be registered after all routes)
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  const status = Number(err.statusCode) || Number(err.status) || 500;
  const isDev = process.env.NODE_ENV === "development";
  const message =
    isDev || status < 500
      ? err.message || "Something went wrong"
      : "Internal server error";
  res.status(status).json({
    success: false,
    message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on : //http://localhost:${PORT}`);
  console.log(`Environment :${process.env.NODE_ENV || " development"}`);
});
