import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { recipes } from "../data/recipes";
import logo from "../assets/logo.png";


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // TODO: Remplacer par un vrai état d'authentification
  const [isLoggedIn, setIsLoggedIn] = useState(true); // True pour simuler la connexion

  // Filtrer les recettes selon la recherche
  const filteredRecipes = searchQuery.length > 0
    ? recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Limiter à 5 résultats
    : [];

  // Fermer les résultats de recherche si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const handleRecipeClick = (recipeId: number) => {
    setSearchQuery("");
    setShowSearchResults(false);
    navigate(`/recette/${recipeId}`);
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex-shrink-0">
            <img src={logo} alt="Data Chef Logo" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-grow max-w-md relative" ref={searchRef}>
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Rechercher une recette..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                className="bg-transparent flex-grow outline-none text-sm"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && filteredRecipes.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                {filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-gray-800 truncate">{recipe.name}</p>
                      <p className="text-xs text-gray-500">{recipe.time} • {recipe.difficulty}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No results message */}
            {showSearchResults && searchQuery.length > 0 && filteredRecipes.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500 text-sm z-50">
                Aucune recette trouvée
              </div>
            )}
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-4">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/catalogue"
              onClick={() => window.scrollTo(0, 0)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors font-medium"
            >
              Catalogue
            </Link>
            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors font-medium"
            >
              A propos
            </Link>
          </nav>

          {/* User Icon - Hidden on mobile */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer"
            >
              <FaUser className="text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/calendrier"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Mon calendrier
                    </Link>
                    <Link
                      to="/favoris"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Mes favoris
                    </Link>
                    <Link
                      to="/profil"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Informations personnelles
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        // TODO: Logique de déconnexion
                        setIsLoggedIn(false);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/connexion"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/inscription"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            {/* Search Bar Mobile */}
            <div className="mb-4 relative">
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Rechercher une recette..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                  className="bg-transparent flex-grow outline-none text-sm"
                />
              </div>

              {/* Search Results Dropdown Mobile */}
              {showSearchResults && filteredRecipes.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                  {filteredRecipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => {
                        handleRecipeClick(recipe.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors text-left border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={recipe.image} 
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-gray-800 truncate">{recipe.name}</p>
                        <p className="text-xs text-gray-500">{recipe.time} • {recipe.difficulty}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No results message Mobile */}
              {showSearchResults && searchQuery.length > 0 && filteredRecipes.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500 text-sm z-50">
                  Aucune recette trouvée
                </div>
              )}
            </div>

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
                to="/about"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                A propos
              </Link>
            </nav>

            {/* User Section Mobile */}
            <div className="mt-4 pt-4 border-t">
              {isLoggedIn ? (
                <Link 
                  to="/profil"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600" />
                  </div>
                  <span className="font-medium">Mon compte</span>
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/connexion"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-center bg-[#8ACBFF] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link 
                    to="/inscription"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-center border-2 border-[#8ACBFF] text-[#8ACBFF] font-medium rounded-md hover:bg-[#8ACBFF] hover:text-white transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
