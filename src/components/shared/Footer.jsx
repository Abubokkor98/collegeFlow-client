import React from "react";
import { GraduationCap, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.1),transparent_50%)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(147,51,234,0.1),transparent_50%)] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Services Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Services</h3>
            </div>
            <nav className="space-y-3">
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  College Booking
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Admission
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Research
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
            </nav>
          </div>

          {/* Company Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Company</h3>
            </div>
            <nav className="space-y-3">
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  About us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Careers
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
            </nav>
          </div>

          {/* Legal Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Legal</h3>
            </div>
            <nav className="space-y-3">
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Terms of use
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Privacy policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
              <a href="#" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="relative">
                  Cookie policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </a>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Enter your email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="username@site.com"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300"
                  />
                  <button 
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-md transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CollegeFlow
                </span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/20"></div>
              <p className="text-white/60 text-sm">
                © 2024 CollegeFlow. All rights reserved.
              </p>
            </div>

            {/* Social Links or Additional Info */}
            <div className="flex items-center space-x-6">
              <span className="text-white/60 text-sm">
                Empowering Education Journey
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}