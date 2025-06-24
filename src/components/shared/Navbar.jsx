import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { GraduationCap, User, LogOut, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 shadow-2xl relative z-90">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="flex items-center justify-between max-w-7xl mx-auto relative z-10">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center space-x-2 sm:space-x-3 group"
          onClick={closeMobileMenu}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg">
              <GraduationCap className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
          </div>
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300">
            CollegeFlow
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-2">
          <Link
            to="/"
            className="relative text-white/90 hover:text-white px-4 xl:px-6 py-3 text-sm font-medium transition-all duration-300 group rounded-xl hover:bg-white/10 backdrop-blur-sm"
          >
            Home
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-8 transition-all duration-300 rounded-full"></span>
          </Link>

          <Link
            to="/colleges"
            className="relative text-white/90 hover:text-white px-4 xl:px-6 py-3 text-sm font-medium transition-all duration-300 group rounded-xl hover:bg-white/10 backdrop-blur-sm"
          >
            Colleges
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-8 transition-all duration-300 rounded-full"></span>
          </Link>
          <Link
            to="/admission"
            className="relative text-white/90 hover:text-white px-4 xl:px-6 py-3 text-sm font-medium transition-all duration-300 group rounded-xl hover:bg-white/10 backdrop-blur-sm"
          >
            Admission
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-8 transition-all duration-300 rounded-full"></span>
          </Link>

          {user && (
            <Link
              to="/my-college"
              className="relative text-white/90 hover:text-white px-4 xl:px-6 py-3 text-sm font-medium transition-all duration-300 group rounded-xl hover:bg-white/10 backdrop-blur-sm"
            >
              My College
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-8 transition-all duration-300 rounded-full"></span>
            </Link>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {user ? (
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-white/20 rounded-xl lg:rounded-2xl px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                </div>
                <span className="hidden lg:inline">
                  {user.displayName || "Profile"}
                </span>
                <span className="lg:hidden">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 backdrop-blur-sm border border-red-400/30 rounded-xl lg:rounded-2xl px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-medium text-red-200 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <LogOut className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 lg:space-x-3">
              <Link
                to="/login"
                className="bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-white/20 rounded-xl lg:rounded-2xl px-4 lg:px-8 py-2 lg:py-3 text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl lg:rounded-2xl px-4 lg:px-8 py-2 lg:py-3 text-xs lg:text-sm font-medium text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {user && (
            <Link
              to="/profile"
              className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              onClick={closeMobileMenu}
            >
              <User className="h-4 w-4 text-white" />
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-indigo-900/98 via-gray-800/98 to-gray-900/98 backdrop-blur-xl border-b border-white/10 shadow-2xl z-100">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-white/90 hover:text-white px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/colleges"
                className="block text-white/90 hover:text-white px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                onClick={closeMobileMenu}
              >
                Colleges
              </Link>
              <Link
                to="/admission"
                className="block text-white/90 hover:text-white px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                onClick={closeMobileMenu}
              >
                Admission
              </Link>
              {user && (
                <Link
                  to="/my-college"
                  className="block text-white/90 hover:text-white px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                  onClick={closeMobileMenu}
                >
                  My College
                </Link>
              )}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-white/10">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-sm font-medium text-white transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span>{user.displayName || "Profile"}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="flex items-center space-x-3 w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 backdrop-blur-sm border border-red-400/30 rounded-2xl px-4 py-3 text-sm font-medium text-red-200 hover:text-white transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl px-6 py-3 text-sm font-medium text-white transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
