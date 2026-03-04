import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaBell, FaCalendarAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import Header from "../components/Header";
import logo from "../assets/logo.png";
import backgroundVector from "../assets/Background vector.png";
import { recipes } from "../data/recipes";

interface PlannedMeal {
  recipeId: number;
  mealType: "breakfast" | "lunch" | "snack" | "dinner";
}

interface DayPlan {
  date: string;
  dayName: string;
  meals: PlannedMeal[];
}

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Lundi
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>([]);

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  useEffect(() => {
    document.title = "Mon calendrier - Data Chef";
    
    // Générer les jours de la semaine (seulement les 5 jours ouvrés)
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Obtenir le lundi de la semaine
    
    const week: DayPlan[] = days.map((dayName, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + mondayOffset + index);
      
      return {
        date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        dayName,
        meals: []
      };
    });

    // Ajouter quelques recettes d'exemple
    week[1].meals.push({ recipeId: 2, mealType: "lunch" });
    week[2].meals.push({ recipeId: 12, mealType: "breakfast" });
    week[3].meals.push({ recipeId: 1, mealType: "dinner" });
    week[4].meals.push({ recipeId: 2, mealType: "dinner" });

    setWeekPlan(week);
  }, []);

  const handleLogout = () => {
    console.log("Déconnexion");
    navigate("/");
  };

  const getMealsForDayAndType = (dayIndex: number, mealType: PlannedMeal["mealType"]) => {
    if (!weekPlan[dayIndex]) return [];
    return weekPlan[dayIndex].meals.filter(meal => meal.mealType === mealType);
  };

  const getMealTypeLabel = (type: string) => {
    switch(type) {
      case "breakfast": return "Petit-déjeuner";
      case "lunch": return "Déjeuner";
      case "dinner": return "Dîner";
      case "snack": return "Goûter";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
      <Header />
      
      <div className="flex-grow flex pt-18">
        {/* Sidebar bleue */}
        <aside className="w-64 bg-[#8ACBFF] text-white flex flex-col">
          {/* Logo */}
          <Link to="/" className="p-6 block">
            <img src={logo} alt="Data Chef" className="w-32" />
          </Link>

          {/* Profil utilisateur */}
          <div className="px-6 pb-6 border-b border-white/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="text-[#8ACBFF] text-xl" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">John Doe</p>
                <p className="text-xs text-white/80 truncate">johndoe@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Menu de navigation */}
          <nav className="flex-grow px-4 py-6 space-y-2">
            <Link
              to="/profil"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-md transition-colors"
            >
              <FaUser className="text-lg" />
              <span className="text-sm font-medium">Mon Profile</span>
            </Link>
            <Link
              to="/parametres"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-md transition-colors"
            >
              <FaCog className="text-lg" />
              <span className="text-sm font-medium">Paramètre</span>
            </Link>
            <Link
              to="/notifications"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-md transition-colors"
            >
              <FaBell className="text-lg" />
              <span className="text-sm font-medium">Notification</span>
            </Link>
            <Link
              to="/calendrier"
              className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-md transition-colors"
            >
              <FaCalendarAlt className="text-lg" />
              <span className="text-sm font-medium">Mon planning</span>
            </Link>
            <Link
              to="/courses"
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-md transition-colors"
            >
              <FaShoppingCart className="text-lg" />
              <span className="text-sm font-medium">Ma liste de Courses</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-md transition-colors text-left"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm font-medium">Déconnexion</span>
            </button>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-grow p-12 overflow-auto relative">
          {/* Image décorative en arrière-plan */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img 
              src={backgroundVector} 
              alt="" 
              className="absolute -right-64 top-0 h-full w-auto opacity-30"
            />
          </div>

          {/* Contenu */}
          <div className="relative z-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Planning de la semaine</h1>

            {/* Calendrier avec tous les jours en colonnes */}
            <div className="bg-[#8ACBFF]/40 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-5 gap-4">
                {weekPlan.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex flex-col">
                    {/* En-tête du jour */}
                    <div className="bg-white rounded-lg px-4 py-3 mb-4 text-center">
                      <h3 className="font-bold text-gray-800">{day.dayName}</h3>
                    </div>

                    {/* Matin */}
                    <div className="mb-4">
                      <h4 className="text-white text-sm font-medium mb-2">Matin</h4>
                      <div className="space-y-2">
                        {day.meals.filter(m => m.mealType === "breakfast").map((meal, idx) => {
                          const recipe = recipes.find(r => r.id === meal.recipeId);
                          if (!recipe) return null;
                          return (
                            <Link
                              key={idx}
                              to={`/recette/${recipe.id}`}
                              className="block bg-white rounded-lg p-3 hover:shadow-lg transition-shadow"
                            >
                              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-xs text-center font-medium text-gray-800 line-clamp-2">{recipe.name}</p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Midi */}
                    <div className="mb-4">
                      <h4 className="text-white text-sm font-medium mb-2">Midi</h4>
                      <div className="space-y-2">
                        {day.meals.filter(m => m.mealType === "lunch").map((meal, idx) => {
                          const recipe = recipes.find(r => r.id === meal.recipeId);
                          if (!recipe) return null;
                          return (
                            <Link
                              key={idx}
                              to={`/recette/${recipe.id}`}
                              className="block bg-white rounded-lg p-3 hover:shadow-lg transition-shadow"
                            >
                              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-xs text-center font-medium text-gray-800 line-clamp-2">{recipe.name}</p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Soir */}
                    <div>
                      <h4 className="text-white text-sm font-medium mb-2">Soir</h4>
                      <div className="space-y-2">
                        {day.meals.filter(m => m.mealType === "dinner").map((meal, idx) => {
                          const recipe = recipes.find(r => r.id === meal.recipeId);
                          if (!recipe) return null;
                          return (
                            <Link
                              key={idx}
                              to={`/recette/${recipe.id}`}
                              className="block bg-white rounded-lg p-3 hover:shadow-lg transition-shadow"
                            >
                              <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-xs text-center font-medium text-gray-800 line-clamp-2">{recipe.name}</p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carrousel de recettes */}
            <div className="mb-6">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {recipes.slice(0, 9).map((recipe) => (
                  <Link
                    key={recipe.id}
                    to={`/recette/${recipe.id}`}
                    className="flex-shrink-0 bg-white rounded-lg p-4 hover:shadow-lg transition-shadow w-28"
                  >
                    <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden">
                      <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-center font-medium text-gray-800 line-clamp-2">{recipe.name}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bouton Panier de courses */}
            <div className="flex justify-center">
              <button className="px-8 py-3 bg-[#8ACBFF] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors">
                Panier de courses
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
