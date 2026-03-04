import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaBell, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import Header from "../components/Header";
import logo from "../assets/logo.png";
import backgroundVector from "../assets/Background Vector.png";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "John Doe",
    email: "johndoe@gmail.com",
    telephone: "+33 06 04 06 66",
    localisation: "Toulouse"
  });

  useEffect(() => {
    document.title = "Informations personnelles - Data Chef";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Logique de sauvegarde du profil
    console.log("Données du profil:", formData);
  };

  const handleLogout = () => {
    // TODO: Logique de déconnexion
    console.log("Déconnexion");
    navigate("/");
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
            className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-md transition-colors"
          >
            <FaUser className="text-lg" />
            <span className="text-sm font-medium">Mon Profil</span>
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
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-md transition-colors"
          >
            <FaCalendarAlt className="text-lg" />
            <span className="text-sm font-medium">Mon planning</span>
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
      <main className="flex-grow p-24 overflow-auto relative">
        {/* Image décorative en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src={backgroundVector} 
            alt="" 
            className="absolute -right-64 top-24 h-[100%] w-auto opacity-50"
          />
        </div>

        {/* Formulaire */}
        <div className="relative z-10 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border-b-2 border-gray-300 focus:outline-none focus:border-[#8ACBFF] transition-colors text-[#8ACBFF]"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border-b-2 border-gray-300 focus:outline-none focus:border-[#8ACBFF] transition-colors text-[#8ACBFF]"
              />
            </div>

            {/* Numéro de téléphone */}
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border-b-2 border-gray-300 focus:outline-none focus:border-[#8ACBFF] transition-colors text-[#8ACBFF]"
              />
            </div>

            {/* Localisation */}
            <div>
              <label htmlFor="localisation" className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                type="text"
                id="localisation"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border-b-2 border-gray-300 focus:outline-none focus:border-[#8ACBFF] transition-colors text-[#8ACBFF]"
              />
            </div>

            {/* Bouton Sauvegarder */}
            <button
              type="submit"
              className="px-8 py-3 bg-[#8ACBFF] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
            >
              Sauvegarder
            </button>
          </form>
        </div>
      </main>
      </div>
    </div>
  );
};

export default ProfilePage;
