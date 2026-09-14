import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ChefHat,
  Home,
  UtensilsCrossed,
  Calendar,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900"
          >
            {/* <ChefHat className="w-7 h-7 text-purple-500" /> */}
            <img src="/mealForge.png" alt="Meal Forge Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0" />
            <span>Meal Forge</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/dashboard"
              icon={<Home className="w-4 h-4" />}
              label="Dashboard"
            />
            <NavLink
              to="/pantry"
              icon={<UtensilsCrossed className="w-4 h-4" />}
              label="Pantry"
            />
            <NavLink
              to="/generate"
              icon={<ChefHat className="w-4 h-4" />}
              label="Generate"
            />
            <NavLink
              to="/recipes"
              icon={<UtensilsCrossed className="w-4 h-4" />}
              label="Recipes"
            />
            <NavLink
              to="/meal-plan"
              icon={<Calendar className="w-4 h-4" />}
              label="Meal Plan"
            />
            <NavLink
              to="/shopping-list"
              icon={<ShoppingCart className="w-4 h-4" />}
              label="Shopping"
            />
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-purple-600"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline font-medium">
                  {user?.name || "User"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0  mt-2 w-64 bg-white rounded-lg shadow-lg border">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold ">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logout button */}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Hamburger menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1 shadow-inner animate-fade-in">
          <NavLink
            to="/dashboard"
            icon={<Home className="w-4 h-4" />}
            label="Dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavLink
            to="/pantry"
            icon={<UtensilsCrossed className="w-4 h-4" />}
            label="Pantry"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavLink
            to="/generate"
            icon={<ChefHat className="w-4 h-4" />}
            label="Generate"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavLink
            to="/recipes"
            icon={<UtensilsCrossed className="w-4 h-4" />}
            label="Recipes"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavLink
            to="/meal-plan"
            icon={<Calendar className="w-4 h-4" />}
            label="Meal Plan"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavLink
            to="/shopping-list"
            icon={<ShoppingCart className="w-4 h-4" />}
            label="Shopping"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label, onClick }) => {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? "text-purple-600 bg-purple-50"
            : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </RouterNavLink>
  );
};
export default Navbar;
