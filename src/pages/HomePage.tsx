import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ReviewsCarousel from "../components/ReviewsCarousel";
import Features from "../components/Features";
import RecipeIdeas from "../components/RecipeIdeas";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import miniLogo from "../assets/Mini logo cloud.png";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Accueil - Data Chef";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow relative overflow-hidden">
        {/* Very large decorative logo spanning multiple sections */}
        <div className="absolute rotate-90 left-0 top-[30%] w-[1500px] h-[1500px] -translate-x-1/4 pointer-events-none z-[1]">
          <img 
            src={miniLogo} 
            alt="Chef decoration" 
            className="w-full h-full object-contain opacity-25"
          />
        </div>
        
        <div className="relative">
          <Hero />
          <ReviewsCarousel />
          <Features />
          <RecipeIdeas />
          <FAQ />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;