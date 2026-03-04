import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import RecipePage from "./pages/RecipePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogue" element={<CataloguePage />} />
      <Route path="/recette/:id" element={<RecipePage />} />
      <Route path="/inscription" element={<SignupPage />} />
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/profil" element={<ProfilePage />} />
      <Route path="/calendrier" element={<CalendarPage />} />
    </Routes>
  );
};

export default App;
