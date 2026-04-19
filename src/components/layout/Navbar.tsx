import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: BRAND & DEKTOP NAV */}
          <div className="flex items-center gap-10">
            {/* Brand/Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-gray-900">
                DataNet.
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 font-medium text-sm">
              <Link
                to="/dashboard"
                className={`py-2 transition-all duration-200 ${
                  isActive("/dashboard")
                    ? "text-gray-700 underline decoration-2 underline-offset-8"
                    : "text-gray-600 hover:text--600 hover:underline hover:decoration-2 hover:underline-offset-8 hover:decoration-gray-300"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/transactions"
                className={`py-2 transition-all duration-200 ${
                  isActive("/transactions")
                    ? "text-gray-700 underline decoration-2 underline-offset-8"
                    : "text-gray-600 hover:text-gray-700 hover:underline hover:decoration-2 hover:underline-offset-8 hover:decoration-gray-300"
                }`}
              >
                Riwayat
              </Link>
            </div>
          </div>

          {/* RIGHT: USER & LOGOUT (Desktop) */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-900">
                {user?.email ? user.email.split('@')[0] : "Guest"}
              </span>
              <span className="text-xs text-gray-500">
                {user?.email || "Belum login"}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 text-base font-medium transition-all duration-200 ${
                isActive("/dashboard") 
                  ? "text-blue-600 underline decoration-2 underline-offset-4" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`block px-3 py-2 text-base font-medium transition-all duration-200 ${
                isActive("/transactions") 
                  ? "text-blue-600 underline decoration-2 underline-offset-4" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Riwayat
            </Link>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                 {user?.email ? user.email.charAt(0).toUpperCase() : "G"}
              </div>
              <div>
                <div className="text-base font-medium text-gray-800">{user?.email ? user.email.split('@')[0] : "Guest"}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email || "Belum login"}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-center bg-red-50 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;