import React from "react";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { recipes } from "../data/recipes";
import broccoli from "../assets/Black icons/Broccoli.png";
import fastFood from "../assets/Black icons/Fast Food.png";
import healthyFood from "../assets/Black icons/Healthy Food.png";
import hot from "../assets/Black icons/Hot.png";
import strawberryCheesecake from "../assets/Black icons/Strawberry Cheesecake.png";

interface Category {
  id: number;
  name: string;
  icon: string;
}

const RecipeIdeas: React.FC = () => {
  const categories: Category[] = [
    { id: 1, name: "Plats Chauds", icon: hot },
    { id: 2, name: "Plats Rapides", icon: fastFood },
    { id: 3, name: "Healthy", icon: healthyFood },
    { id: 4, name: "Végétariens", icon: broccoli },
    { id: 5, name: "Desserts", icon: strawberryCheesecake },
  ];

  // Afficher les 4 premières recettes
  const displayedRecipes = recipes.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Idées de recettes
          </h2>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-8 mb-16 flex-wrap">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/catalogue?category=${category.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              {/* Avatar Circle */}
              <div className="w-20 h-20 bg-[#8ACBFF] rounded-full flex items-center justify-center p-4 shadow-lg group-hover:scale-110 transition-transform">
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              {/* Category Name */}
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
          {displayedRecipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              to={`/recette/${recipe.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex flex-col group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Recipe Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Time Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <FaClock className="text-[#8ACBFF] text-xs" />
                  <span className="text-xs font-semibold text-gray-700">{recipe.time}</span>
                </div>
              </div>
              {/* Recipe Title */}
              <div className="px-4 py-4">
                <h3 className="font-semibold text-gray-900 text-base">{recipe.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Catalogue Button */}
        <div className="text-center">
          <Link to="/catalogue" onClick={() => window.scrollTo(0, 0)}>
            <button className="px-10 py-3 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg">
              Catalogue
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecipeIdeas;
