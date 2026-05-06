import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import miniLogo from "../assets/Mini logo cloud.png";
import { useAuth } from "../contexts/AuthContext";


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const displayName = user?.username ?? "Utilisateur";
  const encodedName = encodeURIComponent(displayName);
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=8ACBFF&color=fff&size=96`;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="shrink-0">
            <h1 className="text-2xl font-bold tracking-wide relative">
              <span className="text-[#8ACBFF]">DATA</span>{" "}
              <span className="text-gray-800 relative inline-block">
                CH
                <span className="relative">
                  <img 
                    src={miniLogo} 
                    alt="Chef" 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-10 object-contain"
                  />
                  E
                </span>
                F
              </span>
            </h1>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              À propos
            </Link>
            <Link
              to="/catalogue"
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Catalogue
            </Link>
            <Link
              to="/faq"
              onClick={() => window.scrollTo(0, 0)}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              FAQ
            </Link>
          </nav>

          {/* Right side - Notification & Login */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Notification Icon */}
            <Link 
              to="/notifications" 
              onClick={() => window.scrollTo(0, 0)}
              className="relative"
            >
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaBell className="text-gray-700 text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </Link>

            {/* Login Button with Avatar */}
            {isAuthenticated ? (
              <Link 
                to="/profil"
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-2 px-4 py-2 bg-[#6BCF7F] hover:bg-[#5ABF6F] text-white rounded-full transition-colors"
              >
                <span className="font-medium">Profil</span>
                <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                  <img 
                    src={avatarUrl}
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link 
                to="/connexion"
                onClick={() => window.scrollTo(0, 0)}
                className="flex items-center gap-2 px-4 py-2 bg-[#6BCF7F] hover:bg-[#5ABF6F] text-white rounded-full transition-colors"
              >
                <span className="font-medium">Connexion</span>
                <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                  <img 
                    src="https://via.placeholder.com/32" 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden shrink-0 w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            {/* Navigation Links Mobile */}
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                Accueil
              </Link>
              <Link
                to="/about"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                À propos
              </Link>
              <Link
                to="/catalogue"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                Catalogue
              </Link>
              <Link
                to="/faq"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                FAQ
              </Link>
            </nav>

            {/* User Section Mobile */}
            <div className="mt-4 pt-4 border-t">
              {isAuthenticated ? (
                <Link 
                  to="/profil"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#6BCF7F] text-white font-medium rounded-full hover:bg-[#5ABF6F] transition-colors"
                >
                  <span>Profil</span>
                  <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                    <img 
                      src={avatarUrl}
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              ) : (
                <Link 
                  to="/connexion"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#6BCF7F] text-white font-medium rounded-full hover:bg-[#5ABF6F] transition-colors"
                >
                  <span>Connexion</span>
                  <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                    <img 
                      src="https://via.placeholder.com/32" 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
