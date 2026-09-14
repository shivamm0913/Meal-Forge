import express from "express";
import * as mealPlansController from "../controllers/mealPlannerController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ALL ROUTES ARE PROTECTED
router.use(authMiddleware);

router.get("/weekly", mealPlansController.getWeeklyMealPlan);
router.get("/upcoming", mealPlansController.getUpcomingMeals);
router.get("/stats", mealPlansController.getMealPlanStats);
router.post("/", mealPlansController.addToMealPlan);
router.delete("/:id", mealPlansController.deleteMealPlan);

export default router;

