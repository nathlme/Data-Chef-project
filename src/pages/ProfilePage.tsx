import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaBell, FaCalendarAlt, FaSignOutAlt, FaShoppingCart, FaCamera, FaEnvelope, FaPhone, FaWallet, FaInfoCircle, FaCheck, FaSun, FaMoon, FaUtensils, FaLock, FaTrash } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profil");
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "+33 6 12 34 56 78"
  });
  const [notifications, setNotifications] = useState({
    nouvellesRecettes: true,
    planningHebdo: true,
    listeCourses: true,
    promotions: false,
    rappelsPreparation: true
  });
  const [preferences, setPreferences] = useState({
    regimeAlimentaire: ["sansGluten"] as string[],
    langue: "francais",
    theme: "clair"
  });

  useEffect(() => {
    document.title = "Informations personnelles - Data Chef";
  }, []);

  useEffect(() => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      nom: user.username,
      email: user.email ?? "",
    }));
  }, [user]);

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

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const setRegimeAlimentaire = (regime: string) => {
    setPreferences(prev => ({
      ...prev,
      regimeAlimentaire: prev.regimeAlimentaire.includes(regime)
        ? prev.regimeAlimentaire.filter(r => r !== regime)
        : [...prev.regimeAlimentaire, regime]
    }));
  };

  const setLangue = (langue: string) => {
    setPreferences(prev => ({ ...prev, langue }));
  };

  const setTheme = (theme: string) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/connexion");
  };

  const displayName = user?.username ?? "Utilisateur";
  const displayEmail = user?.email ?? "";
  const encodedDisplayName = encodeURIComponent(displayName);
  const avatarSmall = `https://ui-avatars.com/api/?name=${encodedDisplayName}&background=8ACBFF&color=fff&size=56`;
  const avatarLarge = `https://ui-avatars.com/api/?name=${encodedDisplayName}&background=8ACBFF&color=fff&size=96`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar bleue */}
      <aside className="w-72 bg-[#8ACBFF] text-white flex flex-col fixed h-screen">
        {/* Logo */}
        <Link to="/" className="p-8 block">
          <h1 className="text-2xl font-bold">DATA CHEF</h1>
        </Link>

        {/* Profil utilisateur */}
        <div className="px-6 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <img src={avatarSmall} alt={displayName} className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-base">{displayName}</p>
              <p className="text-sm text-white/80">{displayEmail}</p>
            </div>
          </div>
        </div>

        {/* Menu de navigation */}
        <nav className="grow px-4 space-y-2">
          <button
            onClick={() => setActiveTab("parametres")}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors text-left"
          >
            <FaCog className="text-xl shrink-0" />
            <span className="text-base">Paramètres</span>
          </button>
          <Link
            to="/notifications"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaBell className="text-xl shrink-0" />
            <span className="text-base">Notifications</span>
          </Link>
          <Link
            to="/calendrier"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaCalendarAlt className="text-xl shrink-0" />
            <span className="text-base">Mon planning</span>
          </Link>
          <Link
            to="/shopping-list"
            className="flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaShoppingCart className="text-xl shrink-0" />
            <span className="text-base">Ma liste de Courses</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/10 rounded-lg transition-colors text-left"
          >
            <FaSignOutAlt className="text-xl shrink-0" />
            <span className="text-base">Déconnexion</span>
          </button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="grow ml-72 p-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Paramètres</h1>

        {/* Onglets */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => setActiveTab("profil")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === "profil"
                ? "bg-white shadow-md text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaUser className="text-sm" />
            <span>Profil</span>
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === "notifications"
                ? "bg-white shadow-md text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaBell className="text-sm" />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === "preferences"
                ? "bg-white shadow-md text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaCog className="text-sm" />
            <span>Préférences</span>
          </button>
          <button
            onClick={() => setActiveTab("compte")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === "compte"
                ? "bg-white shadow-md text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaWallet className="text-sm" />
            <span>Compte</span>
          </button>
          <button
            onClick={() => setActiveTab("apropos")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === "apropos"
                ? "bg-white shadow-md text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FaInfoCircle className="text-sm" />
            <span>À propos</span>
          </button>
        </div>

        {/* Contenu de l'onglet Profil */}
        {activeTab === "profil" && (
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <FaUser className="text-[#8ACBFF] text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Informations du profil</h2>
            </div>

            {/* Avatar et informations */}
            <div className="flex items-center gap-6 mb-10">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={avatarLarge} alt={displayName} className="w-full h-full" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#8ACBFF] rounded-full flex items-center justify-center shadow-md hover:bg-opacity-90 transition-colors">
                  <FaCamera className="text-white text-sm" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{displayName}</h3>
                <p className="text-sm text-gray-500">Membre depuis janvier 2025</p>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom complet */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ACBFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ACBFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ACBFF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Bouton Sauvegarder */}
              <button
                type="submit"
                className="w-full bg-[#8ACBFF] text-white font-semibold py-3 rounded-xl hover:bg-opacity-90 transition-colors shadow-md"
              >
                Sauvegarder les modifications
              </button>
            </form>
          </div>
        )}

        {/* Onglet Notifications */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <FaBell className="text-[#8ACBFF] text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Préférences de notifications</h2>
            </div>

            <div className="space-y-6">
              {/* Nouvelles recettes */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Nouvelles recettes</h3>
                  <p className="text-sm text-gray-500">Recevoir des notifications pour les nouvelles recettes</p>
                </div>
                <button
                  onClick={() => toggleNotification("nouvellesRecettes")}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    notifications.nouvellesRecettes ? "bg-[#7CCB7D]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      notifications.nouvellesRecettes ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Planning hebdomadaire */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Planning hebdomadaire</h3>
                  <p className="text-sm text-gray-500">Rappels de votre planning de la semaine</p>
                </div>
                <button
                  onClick={() => toggleNotification("planningHebdo")}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    notifications.planningHebdo ? "bg-[#7CCB7D]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      notifications.planningHebdo ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Liste de courses */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Liste de courses</h3>
                  <p className="text-sm text-gray-500">Notifications pour vos listes de courses</p>
                </div>
                <button
                  onClick={() => toggleNotification("listeCourses")}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    notifications.listeCourses ? "bg-[#7CCB7D]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      notifications.listeCourses ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Promotions */}
              <div className="flex items-start justify-between py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Promotions</h3>
                  <p className="text-sm text-gray-500">Offres spéciales et réductions</p>
                </div>
                <button
                  onClick={() => toggleNotification("promotions")}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    notifications.promotions ? "bg-[#7CCB7D]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      notifications.promotions ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Rappels de préparation */}
              <div className="flex items-start justify-between py-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Rappels de préparation</h3>
                  <p className="text-sm text-gray-500">Rappels pour commencer la préparation des repas</p>
                </div>
                <button
                  onClick={() => toggleNotification("rappelsPreparation")}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    notifications.rappelsPreparation ? "bg-[#7CCB7D]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      notifications.rappelsPreparation ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Préférences */}
        {activeTab === "preferences" && (
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <FaUtensils className="text-[#FF8559] text-xl" />
              <h2 className="text-xl font-bold text-gray-800">Préférences culinaires</h2>
            </div>

            {/* Régimes alimentaires */}
            <div className="mb-10">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Régimes alimentaires</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRegimeAlimentaire("vegetarien")}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.regimeAlimentaire.includes("vegetarien")
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <FaUtensils className="text-sm" />
                  <span className="font-medium">Végétarien</span>
                  {preferences.regimeAlimentaire.includes("vegetarien") && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setRegimeAlimentaire("vegan")}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.regimeAlimentaire.includes("vegan")
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span>🌱</span>
                  <span className="font-medium">Végan</span>
                  {preferences.regimeAlimentaire.includes("vegan") && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setRegimeAlimentaire("sansGluten")}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.regimeAlimentaire.includes("sansGluten")
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span>🌾</span>
                  <span className="font-medium">Sans gluten</span>
                  {preferences.regimeAlimentaire.includes("sansGluten") && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setRegimeAlimentaire("sansLactose")}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.regimeAlimentaire.includes("sansLactose")
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span>🥛</span>
                  <span className="font-medium">Sans lactose</span>
                  {preferences.regimeAlimentaire.includes("sansLactose") && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setRegimeAlimentaire("halal")}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.regimeAlimentaire.includes("halal")
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span>☪️</span>
                  <span className="font-medium">Halal</span>
                  {preferences.regimeAlimentaire.includes("halal") && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setRegimeAlimentaire("casher")}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.regimeAlimentaire.includes("casher")
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span>✡️</span>
                  <span className="font-medium">Casher</span>
                  {preferences.regimeAlimentaire.includes("casher") && <FaCheck className="ml-auto" />}
                </button>
              </div>
            </div>

            {/* Langue */}
            <div className="mb-10">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Langue</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setLangue("francais")}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.langue === "francais"
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span className="text-lg">🇫🇷</span>
                  <span className="font-medium">Français</span>
                  {preferences.langue === "francais" && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setLangue("english")}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.langue === "english"
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span className="text-lg">🇬🇧</span>
                  <span className="font-medium">English</span>
                  {preferences.langue === "english" && <FaCheck className="ml-auto" />}
                </button>

                <button
                  onClick={() => setLangue("espanol")}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                    preferences.langue === "espanol"
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <span className="text-lg">🇪🇸</span>
                  <span className="font-medium">Español</span>
                  {preferences.langue === "espanol" && <FaCheck className="ml-auto" />}
                </button>
              </div>
            </div>

            {/* Thème */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-4">Thème</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme("clair")}
                  className={`flex items-center justify-center gap-3 px-5 py-4 rounded-xl border-2 transition-all ${
                    preferences.theme === "clair"
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <FaSun className="text-lg" />
                  <span className="font-medium">Clair</span>
                </button>

                <button
                  onClick={() => setTheme("sombre")}
                  className={`flex items-center justify-center gap-3 px-5 py-4 rounded-xl border-2 transition-all ${
                    preferences.theme === "sombre"
                      ? "bg-[#7CCB7D] border-[#7CCB7D] text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#7CCB7D]"
                  }`}
                >
                  <FaMoon className="text-lg" />
                  <span className="font-medium">Sombre</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Compte */}
        {activeTab === "compte" && (
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <FaLock className="text-2xl text-[#7CCB7D]" />
              <h2 className="text-2xl font-bold text-gray-800">Compte et sécurité</h2>
            </div>

            {/* Options de compte */}
            <div className="space-y-4 mb-8">
              {/* Changer le mot de passe */}
              <button className="w-full flex items-start gap-4 p-5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-left">
                <FaLock className="text-xl text-gray-400 mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Changer le mot de passe</h3>
                  <p className="text-sm text-gray-500">Modifiez votre mot de passe</p>
                </div>
              </button>

              {/* Confidentialité */}
              <button className="w-full flex items-start gap-4 p-5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-left">
                <FaLock className="text-xl text-gray-400 mt-1" />
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">Confidentialité</h3>
                  <p className="text-sm text-gray-500">Gérez vos données personnelles</p>
                </div>
              </button>
            </div>

            {/* Actions de compte */}
            <div className="space-y-4">
              {/* Bouton Se déconnecter */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#7CCB7D] hover:bg-[#6BB76C] text-white rounded-2xl font-semibold transition-all"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Se déconnecter</span>
              </button>

              {/* Bouton Supprimer mon compte */}
              <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-semibold transition-all">
                <FaTrash className="text-lg" />
                <span>Supprimer mon compte</span>
              </button>
            </div>
          </div>
        )}

        {/* Autres onglets (à implémenter) */}
        {activeTab !== "profil" && activeTab !== "notifications" && activeTab !== "preferences" && activeTab !== "compte" && (
          <div className="bg-white rounded-3xl shadow-lg p-10 max-w-3xl">
            <p className="text-gray-500">Contenu à venir...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
