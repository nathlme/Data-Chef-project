import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const categories: Category[] = [
    { id: 1, name: "Plats chauds", icon: hot },
    { id: 2, name: "Plats rapides", icon: fastFood },
    { id: 3, name: "Healthy", icon: healthyFood },
    { id: 4, name: "Végétarien", icon: broccoli },
    { id: 5, name: "Desserts", icon: strawberryCheesecake },
  ];

  // Utiliser les 10 premières recettes du fichier centralisé
  const displayedRecipes = recipes.slice(0, 10);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="inline-block bg-gray-200 px-8 py-3 text-2xl font-bold">
            Idées de recettes
          </h2>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/catalogue?category=${category.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {/* Avatar Circle */}
              <div className="w-16 h-16 bg-[#8ACBFF] border-2 border-gray-300 rounded-full flex items-center justify-center p-3">
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Category Name */}
              <span className="text-sm text-gray-700 px-3 py-1">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="relative">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#FF8559] hover:bg-[#E67650] shadow-lg rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Faire défiler à gauche"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-6 overflow-x-auto scrollbar-hide px-12 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayedRecipes.map((recipe) => (
              <Link 
                key={recipe.id} 
                to={`/recette/${recipe.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="flex-shrink-0 w-64 flex flex-col gap-2 group"
              >
                {/* Recipe Image */}
                <div className="aspect-square rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    draggable="false"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                {/* Recipe Title */}
                <div className="px-2 py-2 text-center">
                  <span className="text-sm font-medium text-gray-800">{recipe.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#FF8559] hover:bg-[#E67650] shadow-lg rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Faire défiler à droite"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Link to="/catalogue" onClick={() => window.scrollTo(0, 0)}>
            <button className="px-8 py-3 bg-[#FF8559] hover:bg-[#E67650] text-white rounded-full transition-colors cursor-pointer">
              Voir plus
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecipeIdeas;
