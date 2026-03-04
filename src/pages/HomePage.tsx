import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ReviewsCarousel from "../components/ReviewsCarousel";
import Features from "../components/Features";
import RecipeIdeas from "../components/RecipeIdeas";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Accueil - Data Chef";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <ReviewsCarousel />
        <Features />
        <RecipeIdeas />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;