import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaBell, FaCalendarAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { recipes } from "../data/recipes";

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  const mealSlots = ["Matin", "Midi", "Soir"];

  useEffect(() => {
    document.title = "Mon planning - Data Chef";
  }, []);

  const handleLogout = () => {
    console.log("Déconnexion");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-72 bg-[#8ACBFF] text-white flex flex-col fixed h-screen">
        <Link to="/" className="p-8 block">
          <h1 className="text-2xl font-bold">DATA CHEF</h1>
        </Link>

        <div className="px-6 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=8ACBFF&color=fff&size=56"
                alt="John Doe"
                className="w-full h-full"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-base">John Doe</p>
              <p className="text-sm text-white/80">johndoe@gmail.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          <Link
            to="/profil"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaCog className="text-xl flex-shrink-0" />
            <span className="text-base">Paramètres</span>
          </Link>
          <Link
            to="/notifications"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaBell className="text-xl flex-shrink-0" />
            <span className="text-base">Notifications</span>
          </Link>
          <Link
            to="/calendrier"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaCalendarAlt className="text-xl flex-shrink-0" />
            <span className="text-base">Mon planning</span>
          </Link>
          <Link
            to="/shopping-list"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaShoppingCart className="text-xl flex-shrink-0" />
            <span className="text-base">Ma liste de Courses</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors text-left"
          >
            <FaSignOutAlt className="text-xl flex-shrink-0" />
            <span className="text-base">Déconnexion</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-72 p-8 lg:p-10">
        <div className="max-w-7xl">
          <Link
            to="/catalogue"
            className="inline-flex items-center px-6 py-2 rounded-full bg-white text-[#8ACBFF] text-sm font-semibold shadow-sm border border-gray-200"
          >
            Explorer les recettes
          </Link>

          <h1 className="text-5xl md:text-4xl font-bold text-gray-900 mt-6 mb-6">Planning de la semaine</h1>

          <div className="bg-white border border-[#d8e3ea] rounded-2xl px-6 py-4 mb-6">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-gray-700">Astuce :</span> Glissez et déposez les recettes depuis le carrousel ci-dessous vers les cases du planning pour organiser votre semaine.
            </p>
          </div>

          <div className="bg-[#d7e6f3] rounded-3xl p-5 md:p-7 shadow-md mb-8 overflow-x-auto">
            <div className="grid gap-4 min-w-[920px]" style={{ gridTemplateColumns: "110px repeat(5, minmax(150px, 1fr))" }}>
              <div />
              {days.map((day) => (
                <div key={day} className="bg-white rounded-2xl text-center py-3 px-4 shadow-sm border border-gray-200">
                  <span className="font-semibold text-gray-700">{day}</span>
                </div>
              ))}

              {mealSlots.map((slot) => (
                <React.Fragment key={slot}>
                  <div className="flex items-center justify-center">
                    <span className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2 text-sm font-semibold text-gray-700">
                      {slot}
                    </span>
                  </div>
                  {days.map((day) => (
                    <button
                      key={`${slot}-${day}`}
                      className="h-24 bg-[#edf2f7] rounded-xl border border-[#c9d3df] text-gray-400 text-xs font-medium hover:border-[#8ACBFF] transition-colors"
                    >
                      Glisser une recette
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-5">Recettes sélectionnées</h2>

          <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {recipes.slice(0, 8).map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recette/${recipe.id}`}
                className="w-28 flex-shrink-0 bg-white rounded-2xl px-3 py-3 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2">
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-semibold text-center text-gray-700 leading-tight line-clamp-2">
                  {recipe.name}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/shopping-list"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#7ec1f4] text-white rounded-full text-xl md:text-lg font-semibold shadow-lg hover:bg-[#6cb4ea] transition-colors"
            >
              <FaShoppingCart className="text-lg" />
              Panier de courses
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
