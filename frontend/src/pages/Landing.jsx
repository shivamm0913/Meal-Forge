import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ChefHat,
  Sparkles,
  Calendar,
  ShoppingCart,
  Clock,
  ArrowRight,
  AlertCircle,
  Menu,
  X,
  ChevronDown,
  Check,
  Scale,
  UtensilsCrossed,
} from "lucide-react";

const DEMO_PRESETS = [
  {
    cuisine: "Italian",
    diet: "High-Protein",
    ingredients: ["Chicken Breast", "Garlic", "Spinach", "Tomatoes"],
    recipe: {
      name: "Tuscan Garlic Herb Chicken",
      time: "25 mins",
      difficulty: "Easy",
      calories: 460,
      protein: "48g",
      carbs: "12g",
      fats: "18g",
      highlight: "Uses 2 ingredients expiring this week",
      instructions: [
        "Sear chicken breasts in olive oil until golden brown (6-7 mins per side).",
        "Sauté minced garlic, cherry tomatoes, and baby spinach until tender.",
        "Simmer with fresh herbs and spoon over sliced chicken.",
      ],
    },
  },
  {
    cuisine: "Mexican",
    diet: "Keto",
    ingredients: ["Avocado", "Ground Turkey", "Bell Peppers", "Cheese"],
    recipe: {
      name: "Skillet Turkey Fajita Bowl",
      time: "20 mins",
      difficulty: "Easy",
      calories: 510,
      protein: "42g",
      carbs: "9g",
      fats: "34g",
      highlight: "Under 25 mins",
      instructions: [
        "Brown lean ground turkey with cumin, smoked paprika, and chili powder.",
        "Char sliced bell peppers in a hot skillet.",
        "Assemble with diced avocado, cheese, and fresh cilantro.",
      ],
    },
  },
  {
    cuisine: "Indian",
    diet: "Vegetarian",
    ingredients: ["Chickpeas", "Spinach", "Tomatoes", "Coconut Milk"],
    recipe: {
      name: "Golden Coconut Chana Masala",
      time: "30 mins",
      difficulty: "Medium",
      calories: 430,
      protein: "19g",
      carbs: "52g",
      fats: "16g",
      highlight: "High-fiber vegetarian dish",
      instructions: [
        "Toast cumin and mustard seeds in coconut oil.",
        "Simmer crushed tomatoes, turmeric, and chickpeas until rich and fragrant.",
        "Fold in baby spinach and coconut milk; serve warm with rice.",
      ],
    },
  },
];

const FAQS = [
  {
    q: "How does the AI generate recipes from my pantry?",
    a: "You can type ingredients manually or select 'Use ingredients from my pantry'. Meal Forge takes your available ingredients, dietary restrictions, and target cook time to generate a recipe with exact measurements, instructions, and nutritional macros.",
  },
  {
    q: "How does the smart shopping list prevent duplicate purchases?",
    a: "When you schedule meals on the weekly planner, Meal Forge calculates the total ingredients needed. It then checks your active pantry inventory and automatically subtracts what you already have in stock. Your shopping list only contains the remaining items you need to buy.",
  },
  {
    q: "How does Meal Forge help reduce food waste?",
    a: "The pantry manager tracks expiration dates and highlights items expiring within 7 days. The AI recipe generator prioritizes these ingredients, suggesting recipes that use them before they spoil.",
  },
  {
    q: "Can I customize dietary restrictions and serving sizes?",
    a: "Yes. In your Settings, you can set default dietary preferences (Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Paleo), allergies, and family portions. These preferences automatically apply whenever you generate recipes.",
  },
  {
    q: "How does the pantry restocking workflow work?",
    a: "When you finish grocery shopping, check off the items on your shopping list and click 'Add Checked to Pantry'. The system automatically transfers those items to your pantry stock and removes them from your shopping list.",
  },
];

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const activeDemo = DEMO_PRESETS[activeDemoIndex];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 1. NAVBAR (Matches app's Navbar style)                                    */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/mealForge.png"
                alt="Meal Forge Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
              />
              <span className="text-xl font-bold text-gray-900">Meal Forge</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#features" className="hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#demo" className="hover:text-gray-900 transition-colors">
                Recipe Demo
              </a>
              <a href="#comparison" className="hover:text-gray-900 transition-colors">
                Why Meal Forge
              </a>
              <a href="#faq" className="hover:text-gray-900 transition-colors">
                FAQ
              </a>
            </div>

            {/* Auth Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3.5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  >
                    <span>Get Started</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Features
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Recipe Demo
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Why Meal Forge
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-purple-500 text-white rounded-lg font-medium text-sm"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 bg-purple-500 text-white rounded-lg font-medium text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION                                                           */}
      <section className="py-12 sm:py-16 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Meal Planning & Kitchen Inventory</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Turn your pantry ingredients into home-cooked meals.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Meal Forge connects what you have in your fridge with AI recipe generation,
                weekly meal scheduling, and smart shopping lists that automatically
                subtract items you already own.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/signup"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>{isAuthenticated ? "Open Dashboard" : "Get Started"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg font-medium text-sm transition-colors"
                >
                  <span>View Recipe Demo</span>
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-purple-600" />
                  <span>Custom Dietary Restrictions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-purple-600" />
                  <span>7-Day Expiration Alerts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-purple-600" />
                  <span>Grocery Deficit Calculation</span>
                </div>
              </div>
            </div>

            {/* Right Card (Styled like RecipeDetail / Dashboard preview) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                    Generated Recipe Preview
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    25 mins
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Creamy Tuscan Garlic Chicken
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pan-seared chicken cutlets in a garlic, spinach, and tomato reduction.
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-900">
                    Uses <span className="font-semibold">Chicken Breast</span> and{" "}
                    <span className="font-semibold">Spinach</span> expiring soon in your pantry.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-sm font-bold text-gray-900">460</div>
                    <div className="text-xs text-gray-500">Calories</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-sm font-bold text-gray-900">48g</div>
                    <div className="text-xs text-gray-500">Protein</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-sm font-bold text-gray-900">12g</div>
                    <div className="text-xs text-gray-500">Carbs</div>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="text-sm font-bold text-gray-900">18g</div>
                    <div className="text-xs text-gray-500">Fats</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-gray-700 mb-2">
                    In-Stock Pantry Ingredients Used:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      Chicken Breast
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      Baby Spinach
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      Garlic Cloves
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION                                                    */}
      <section className="py-14 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Why Traditional Kitchen Planning Fails
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Disconnected tools create wasted groceries and daily decision fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* The Fragmented Way */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                The Disconnected Way
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>
                    <strong>Unnoticed Expirations:</strong> Fresh produce and dairy spoil in the fridge because recipes don't know what you have.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>
                    <strong>Meal Fatigue:</strong> Wondering what to cook every evening with random items on hand.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>
                    <strong>Duplicate Groceries:</strong> Buying items you already own because your grocery list is manual.
                  </span>
                </li>
              </ul>
            </div>

            {/* The Meal Forge Way */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                The Meal Forge Loop
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Pantry-Aware AI:</strong> Recipes are crafted directly around in-stock items and upcoming expirations.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Weekly Meal Planning:</strong> Schedule breakfast, lunch, and dinner on an organized 7-day calendar.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Deficit Shopping Lists:</strong> Ingredients you already own are subtracted so you only buy what you need.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS                                                           */}
      <section id="how-it-works" className="py-16 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              How Meal Forge Works
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Four connected steps to streamline cooking and shopping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Track Inventory</h3>
              <p className="text-sm text-gray-600">
                Log ingredients, categories, and expiration dates. View 7-day warnings for perishables.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Generate Recipes</h3>
              <p className="text-sm text-gray-600">
                AI crafts dishes matching your dietary restrictions, cook times, and pantry contents.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Plan the Week</h3>
              <p className="text-sm text-gray-600">
                Assign meals to your weekly schedule across breakfast, lunch, and dinner.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Deduct & Restock</h3>
              <p className="text-sm text-gray-600">
                Generate shopping lists minus pantry stock. When checked, add groceries back into inventory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE RECIPE SIMULATOR                                           */}
      <section id="demo" className="py-16 border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Interactive Recipe Simulator
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Select a culinary style to preview how recipes and nutritional breakdowns are structured.
            </p>
          </div>

          {/* Style Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {DEMO_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDemoIndex(idx)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeDemoIndex === idx
                  ? "bg-purple-500 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {preset.cuisine} ({preset.diet})
              </button>
            ))}
          </div>

          {/* Active Recipe Box */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {activeDemo.recipe.name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {activeDemo.cuisine}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {activeDemo.recipe.difficulty}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                    {activeDemo.recipe.highlight}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{activeDemo.recipe.time}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2.5">
                Ingredients Required:
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeDemo.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-gray-100 text-gray-700 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Preparation Steps:
              </h4>
              <ol className="space-y-2.5">
                {activeDemo.recipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-medium mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Macros */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Estimated Nutrition (per serving):
              </h4>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-base font-bold text-gray-900">
                    {activeDemo.recipe.calories}
                  </div>
                  <div className="text-xs text-gray-500">Calories</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-base font-bold text-gray-900">
                    {activeDemo.recipe.protein}
                  </div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-base font-bold text-gray-900">
                    {activeDemo.recipe.carbs}
                  </div>
                  <div className="text-xs text-gray-500">Carbs</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-base font-bold text-gray-900">
                    {activeDemo.recipe.fats}
                  </div>
                  <div className="text-xs text-gray-500">Fats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE FEATURES                                                          */}
      <section id="features" className="py-16 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Core Capabilities
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Everything you need to manage your kitchen efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Recipe Generator</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Generate recipes tailored to your ingredients, cuisine preferences, cook times, and dietary restrictions.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">7-Day Expiry Watchdog</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Keep track of expiration dates. Flag items expiring within 7 days and use them before they spoil.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Deficit Shopping Lists</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Shopping lists subtract what you already have in stock. Transfer bought items straight back to pantry with 1 click.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Weekly Meal Planner</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Schedule Breakfast, Lunch, and Dinner across a full 7-day grid. Navigate between weeks effortlessly.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Portion Scaler</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Adjust serving sizes on any recipe and watch ingredient quantities instantly recalculate.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Cooking Checklist</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Check off ingredients and preparation steps as you cook, keeping your exact place in the recipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMPARISON                                                             */}
      <section id="comparison" className="py-16 border-b border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Why Meal Forge
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              How Meal Forge compares to generic recipe catalogs.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 font-semibold text-gray-900">Capability</th>
                  <th className="p-4 font-semibold text-gray-500">Traditional Recipe Apps</th>
                  <th className="p-4 font-semibold text-purple-700">Meal Forge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 font-medium text-gray-900">Pantry Inventory Connection</td>
                  <td className="p-4 text-gray-500">None</td>
                  <td className="p-4 text-purple-700 font-medium">Real-time inventory sync</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">Automatic Grocery Deficit</td>
                  <td className="p-4 text-gray-500">Adds all ingredients</td>
                  <td className="p-4 text-purple-700 font-medium">Subtracts in-stock items</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">Expiration Priority</td>
                  <td className="p-4 text-gray-500">Ignored</td>
                  <td className="p-4 text-purple-700 font-medium">Weights 7-day expiring items</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">Recipe Customization</td>
                  <td className="p-4 text-gray-500">Static catalog</td>
                  <td className="p-4 text-purple-700 font-medium">Custom generated on-demand</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">Grocery to Pantry Transfer</td>
                  <td className="p-4 text-gray-500">Manual re-entry</td>
                  <td className="p-4 text-purple-700 font-medium">1-click automated restock</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. FAQ                                                                    */}
      <section id="faq" className="py-16 border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:text-purple-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-purple-600" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA (Clean card matching Dashboard style)                      */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ready to streamline your meal planning?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Create an account and start generating recipes from the ingredients already in your kitchen.
            </p>
            <div className="pt-2">
              <Link
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors"
              >
                <span>{isAuthenticated ? "Open Dashboard" : "Get Started"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER                                                                */}
      <footer className="bg-white border-t border-gray-200 py-8 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/mealForge.png"
                alt="Meal Forge Logo"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-900">Meal Forge</span>
              <span>— Kitchen Inventory & Meal Planning</span>
            </div>

            <div className="flex items-center gap-6 text-xs sm:text-sm">
              <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#features" className="hover:text-gray-900 transition-colors">
                Features
              </a>
              <Link to="/login" className="hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-gray-900 transition-colors">
                Sign Up
              </Link>
            </div>

            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Meal Forge.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
