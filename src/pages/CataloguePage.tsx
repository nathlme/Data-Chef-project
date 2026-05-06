import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaClock, FaHeart, FaRegHeart } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import fastFood from "../assets/Black icons/Fast Food.png";
import healthyFood from "../assets/Black icons/Healthy Food.png";
import hot from "../assets/Black icons/Hot.png";
import broccoli from "../assets/Black icons/Broccoli.png";
import strawberryCheesecake from "../assets/Black icons/Strawberry Cheesecake.png";
import miniLogo from "../assets/Mini logo cloud.png";
import { apiClient } from "../api";
import { mapRecipeDtoToCatalogueRecipe, type CatalogueRecipe } from "../utils/recipeCatalog";

const CataloguePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState<CatalogueRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recipesPerPage = 12;

  // Mettre à jour le titre de la page
  useEffect(() => {
    document.title = "Catalogue - Data Chef";
  }, []);

  // Lire le paramètre de catégorie depuis l'URL au chargement
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const loadRecipes = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const recipeList = await apiClient.recipes.getAll();
        if (!isMounted) return;

        setRecipes(recipeList.map(mapRecipeDtoToCatalogueRecipe));
      } catch {
        if (!isMounted) return;

        setErrorMessage("Impossible de charger les recettes depuis le back.");
        setRecipes([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadRecipes();

    return () => {
      isMounted = false;
    };
  }, []);
  
  // Données des catégories
  const categories = [
    { id: 1, name: "Plats Chauds", icon: hot },
    { id: 2, name: "Plats Rapides", icon: fastFood },
    { id: 3, name: "Healthy", icon: healthyFood },
    { id: 4, name: "Végétariens", icon: broccoli },
    { id: 5, name: "Desserts", icon: strawberryCheesecake },
  ];

  // Toggle favorites
  const toggleFavorite = (recipeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'très facile':
      case 'facile':
      case 'easy':
        return 'bg-[#7CCB7D]';
      case 'intermédiaire':
      case 'moyen':
      case 'medium':
        return 'bg-[#FFA726]';
      case 'difficile':
      case 'hard':
        return 'bg-[#EF5350]';
      default:
        return 'bg-gray-400';
    }
  };

  // Filtrer les recettes selon la catégorie sélectionnée
  const filteredRecipes = recipes.filter(recipe => {
    if (selectedCategory && recipe.categoryId !== selectedCategory) return false;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative overflow-hidden">
      
      <Header />

      {/* Very large decorative logo spanning multiple sections */}
      <div className="absolute right-0 top-[10%] w-500 h-500 -translate-x-1/4 pointer-events-none z-1">
        <img 
          src={miniLogo} 
          alt="Chef decoration" 
          className="w-full h-full object-contain opacity-25"
        />
      </div>
      
      <main className="grow pt-28 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Title */}
          <h1 className="text-5xl font-bold text-center mb-12">Catalogue</h1>

          {/* Categories */}
          <div className="flex justify-center gap-12 mb-8 flex-wrap">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center p-4 shadow-lg transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? 'bg-[#6BB8E8] scale-110 ring-4 ring-[#8ACBFF]/30' 
                    : 'bg-[#8ACBFF] group-hover:scale-105'
                }`}>
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <span className={`text-sm font-medium ${
                  selectedCategory === category.id ? 'text-gray-900 font-semibold' : 'text-gray-700'
                }`}>
                  {category.name}
                </span>
              </div>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button className="px-6 py-2 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md">
              Préférences culinaires
            </button>
            <button className="px-6 py-2 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md">
              Contraintes pratiques
            </button>
            <button className="px-6 py-2 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md">
              Mes ingrédients
            </button>
          </div>

          {/* Recettes Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Recettes</h2>

            {errorMessage ? (
              <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {errorMessage}
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-md text-gray-600">
                Chargement des recettes...
              </div>
            ) : null}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedRecipes.map((recipe) => (
                recipe.detailPath ? (
                  <Link
                    key={recipe.id}
                    to={recipe.detailPath}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow">
                    {/* Recipe Image with Badge */}
                    <div className="relative aspect-square mb-3">
                      <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                        <img 
                          src={recipe.image} 
                          alt={recipe.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Difficulty Badge */}
                      <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </div>
                      {/* Time Badge */}
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <FaClock className="text-gray-600 text-xs" />
                        <span className="text-xs font-semibold text-gray-700">{recipe.time}</span>
                      </div>
                    </div>
                    
                    {/* Recipe Info */}
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm grow">{recipe.name}</h3>
                        <button
                          onClick={(e) => toggleFavorite(recipe.id, e)}
                          className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        >
                          {favorites.includes(recipe.id) ? (
                            <FaHeart className="text-red-500" size={18} />
                          ) : (
                            <FaRegHeart size={18} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">{categories.find(c => c.id === recipe.categoryId)?.name || 'Plat'}</p>
                    </div>
                  </div>
                  </Link>
                ) : (
                  <div key={recipe.id} className="group">
                    <div className="bg-white rounded-2xl p-4 shadow-md transition-shadow">
                      <div className="relative aspect-square mb-3">
                        <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                          <img 
                            src={recipe.image} 
                            alt={recipe.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                          {recipe.difficulty}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <FaClock className="text-gray-600 text-xs" />
                          <span className="text-xs font-semibold text-gray-700">{recipe.time}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm grow">{recipe.name}</h3>
                          <button
                            onClick={(e) => toggleFavorite(recipe.id, e)}
                            className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          >
                            {favorites.includes(recipe.id) ? (
                              <FaHeart className="text-red-500" size={18} />
                            ) : (
                              <FaRegHeart size={18} />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-400">{categories.find(c => c.id === recipe.categoryId)?.name || 'Plat'}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                      currentPage === index + 1
                        ? 'bg-[#8ACBFF] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label={`Page ${index + 1}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CataloguePage;
