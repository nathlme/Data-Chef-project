import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { recipes } from "../data/recipes";
import fastFood from "../assets/Black icons/Fast Food.png";
import healthyFood from "../assets/Black icons/Healthy Food.png";
import hot from "../assets/Black icons/Hot.png";
import broccoli from "../assets/Black icons/Broccoli.png";
import strawberryCheesecake from "../assets/Black icons/Strawberry Cheesecake.png";

const CataloguePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [culinaryPreferences, setCulinaryPreferences] = useState<string[]>([]);
  const [practicalConstraints, setPracticalConstraints] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 12;

  // Mettre à jour le titre de la page
  useEffect(() => {
    document.title = "Catalogue de Recettes - Data Chef";
  }, []);

  // Lire le paramètre de catégorie depuis l'URL au chargement
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [searchParams]);
  
  // Données des catégories
  const categories = [
    { id: 1, name: "Plats chauds", icon: hot },
    { id: 2, name: "Plats rapides", icon: fastFood },
    { id: 3, name: "Healthy", icon: healthyFood },
    { id: 4, name: "Végétarien", icon: broccoli },
    { id: 5, name: "Desserts", icon: strawberryCheesecake },
  ];

  // Utiliser les recettes du fichier centralisé
  const allRecipes = recipes;

  // Filtrer les recettes selon la catégorie et les filtres sélectionnés
  const filteredRecipes = allRecipes.filter(recipe => {
    // Filtre par catégorie
    if (selectedCategory && recipe.categoryId !== selectedCategory) return false;
    
    // Filtre par préférences culinaires
    if (culinaryPreferences.length > 0) {
      const hasMatch = culinaryPreferences.some(pref => recipe.filters.culinary.includes(pref));
      if (!hasMatch) return false;
    }
    
    // Filtre par contraintes pratiques
    if (practicalConstraints.length > 0) {
      const hasMatch = practicalConstraints.some(constraint => recipe.filters.practical.includes(constraint));
      if (!hasMatch) return false;
    }
    
    // Filtre par ingrédients
    if (ingredients.length > 0) {
      const hasMatch = ingredients.some(ingredient => recipe.filters.ingredients.includes(ingredient));
      if (!hasMatch) return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, culinaryPreferences, practicalConstraints, ingredients]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Catégories */}
          <section className="mb-16">
            <h2 className="text-5xl font-bold text-center mb-24 mt-8">Catégories</h2>
            <div className="flex justify-center gap-20 flex-wrap">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center p-4 transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category.id 
                      ? 'bg-[#3695e4] ring-2 ring-opacity-50' 
                      : 'bg-[#8ACBFF] border-2 border-gray-300'
                  }`}>
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`text-sm px-3 py-1 ${
                    selectedCategory === category.id ? 'font-semibold' : 'font-medium'
                  }`}>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Filtres supplémentaires */}
            <div className="flex justify-center gap-18 mt-8 flex-wrap relative">
              {/* Préférences culinaires */}
              <div className="relative">
                <button 
                  onClick={() => setOpenFilter(openFilter === 'culinary' ? null : 'culinary')}
                  className={`px-6 py-2 text-white rounded-full transition-all font-medium ${
                    openFilter === 'culinary' ? 'bg-green-400' : 'bg-[#8ACBFF]'
                  }`}
                >
                  Préférences culinaires {openFilter === 'culinary' ? '▴' : '▾'}
                </button>
                
                {openFilter === 'culinary' && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-6 w-80 z-20 border border-gray-200">
                    {/* Régimes & besoins alimentaires */}
                    <div className="mb-6">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Régimes & besoins alimentaires</h4>
                      <div className="space-y-2">
                        {['Végétarien', 'Vegan', 'Sans lactose', 'Sans gluten', 'Low carb', 'Riche en protéines', 'Healthy & équilibré'].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" className="w-4 h-4 accent-green-400" 
                              checked={culinaryPreferences.includes(item)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCulinaryPreferences([...culinaryPreferences, item]);
                                } else {
                                  setCulinaryPreferences(culinaryPreferences.filter(p => p !== item));
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Cuisine du monde */}
                    <div className="mb-6">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Cuisine du monde</h4>
                      <div className="space-y-2">
                        {['Française', 'Italienne', 'Japonaise', 'Mexicaine', 'Indienne', 'Thaï', 'Méditerranée'].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" className="w-4 h-4 accent-green-400"
                              checked={culinaryPreferences.includes(item)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCulinaryPreferences([...culinaryPreferences, item]);
                                } else {
                                  setCulinaryPreferences(culinaryPreferences.filter(p => p !== item));
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Envie / Mood */}
                    <div className="mb-4">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Envie / Mood</h4>
                      <div className="space-y-2">
                        {['Comfort food', 'Léger & frais', 'Épicé', 'À partager'].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" className="w-4 h-4 accent-green-400"
                              checked={culinaryPreferences.includes(item)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCulinaryPreferences([...culinaryPreferences, item]);
                                } else {
                                  setCulinaryPreferences(culinaryPreferences.filter(p => p !== item));
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full mt-4 py-2 text-green-500 text-sm font-medium hover:bg-green-50 rounded transition-colors">
                      Appliquer
                    </button>
                  </div>
                )}
              </div>

              {/* Contraintes pratiques */}
              <div className="relative">
                <button 
                  onClick={() => setOpenFilter(openFilter === 'practical' ? null : 'practical')}
                  className={`px-6 py-2 text-white rounded-full transition-all font-medium ${
                    openFilter === 'practical' ? 'bg-green-400' : 'bg-[#8ACBFF]'
                  }`}
                >
                  Contraintes pratiques {openFilter === 'practical' ? '▴' : '▾'}
                </button>
                
                {openFilter === 'practical' && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-6 w-80 z-20 border border-gray-200">
                    {/* Temps & difficulté */}
                    <div className="mb-6">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Temps & difficulté</h4>
                      <div className="space-y-2">
                        {['Moins de 10 min', 'Moins de 20 min', '30 min max', 'Longue cuisson', 'Très facile', 'Facile', 'Intermédiaire'].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" className="w-4 h-4 accent-green-400"
                              checked={practicalConstraints.includes(item)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPracticalConstraints([...practicalConstraints, item]);
                                } else {
                                  setPracticalConstraints(practicalConstraints.filter(p => p !== item));
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Contexte & budget */}
                    <div className="mb-4">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Contexte & budget</h4>
                      <div className="space-y-2">
                        {['Batch cooking', 'Recettes famille', 'Repas transportables / tupperware', 'Budget mini', "Peu d'ustensiles", 'Idées de dernière minute'].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" className="w-4 h-4 accent-green-400"
                              checked={practicalConstraints.includes(item)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPracticalConstraints([...practicalConstraints, item]);
                                } else {
                                  setPracticalConstraints(practicalConstraints.filter(p => p !== item));
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full mt-4 py-2 text-green-500 text-sm font-medium hover:bg-green-50 rounded transition-colors">
                      Appliquer
                    </button>
                  </div>
                )}
              </div>

              {/* Par ingrédients */}
              <div className="relative">
                <button 
                  onClick={() => setOpenFilter(openFilter === 'ingredients' ? null : 'ingredients')}
                  className={`px-6 py-2 text-white rounded-full transition-all font-medium ${
                    openFilter === 'ingredients' ? 'bg-green-400' : 'bg-[#8ACBFF]'
                  }`}
                >
                  Par ingrédients {openFilter === 'ingredients' ? '▴' : '▾'}
                </button>
                
                {openFilter === 'ingredients' && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-6 w-80 z-20 border border-gray-200">
                    {/* Ingrédients principaux */}
                    <div className="mb-6">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Ingrédients principaux</h4>
                      <div className="space-y-2">
                        {['Poulet', 'Bœuf', 'Poisson', 'Œufs', 'Fromage', 'Légumes', 'Pâtes & riz'].map((item) => (
                          <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" className="w-4 h-4 accent-green-400"
                              checked={ingredients.includes(item)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setIngredients([...ingredients, item]);
                                } else {
                                  setIngredients(ingredients.filter(p => p !== item));
                                }
                              }}
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Mode anti-gaspi */}
                    <div className="mb-4">
                      <h4 className="text-gray-400 text-xs mb-3 uppercase tracking-wide">Mode anti-gaspi</h4>
                      <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input type="checkbox" className="w-4 h-4 accent-green-400"
                          checked={ingredients.includes('À faire avec ce qu\'on a chez soi')}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setIngredients([...ingredients, 'À faire avec ce qu\'on a chez soi']);
                            } else {
                              setIngredients(ingredients.filter(p => p !== 'À faire avec ce qu\'on a chez soi'));
                            }
                          }}
                        />
                        <span className="text-sm">À faire avec ce qu'on a chez soi</span>
                      </label>
                    </div>

                    <button className="w-full mt-4 py-2 text-green-500 text-sm font-medium hover:bg-green-50 rounded transition-colors">
                      Appliquer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section Recettes */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Recettes</h2>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm transition-colors"
                >
                  Afficher toutes les recettes
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recette/${recipe.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <img 
                      src={recipe.image} 
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay avec description au survol */}
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center p-4">
                      <p className="text-white text-center text-sm leading-relaxed">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-sm font-medium">{recipe.name}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination dots */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? 'bg-[#7CCB7D] w-15'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Page ${index + 1}`}
                  />
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
