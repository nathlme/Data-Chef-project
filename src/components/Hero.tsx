import React, { useState } from "react";
import { Link } from "react-router-dom";
import lasagnes from "../assets/lasagnes.jpg";
import pizza from "../assets/pizza.jpg";
import poulet from "../assets/poulet roti.jpg";
import salade from "../assets/salade cesar.jpg";
import tarte from "../assets/tarte aux pommes.jpg";

const Hero: React.FC = () => {
  const images = [
    { src: tarte, alt: "Tarte aux pommes" },
    { src: lasagnes, alt: "Lasagnes" },
    { src: pizza, alt: "Pizza Margherita" },
    { src: poulet, alt: "Poulet rôti" },
    { src: salade, alt: "Salade César" },
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Les 4 petites images (on exclut celle affichée en grand)
  const smallImages = images.slice(1);

  const handleImageChange = (image: { src: string; alt: string }) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMainImage(image);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section className="pt-28 pb-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Side */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Titre principal */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Ta semaine culinaire sans prise de tête
            </h1>

            {/* Text Content */}
            <div className="space-y-3">
              <p className="text-gray-600 leading-relaxed">
                Organise ta semaine culinaire en quelques secondes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Data-Chef choisit les recettes, prépare le planning, gère les courses et veille à ton équilibre nutritionnel.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Tu n'as plus qu'à cuisiner l'esprit léger.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <Link to="/catalogue" onClick={() => window.scrollTo(0, 0)}>
                <button className="px-8 py-3 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg">
                  Catalogue
                </button>
              </Link>
              <Link to="/calendrier" onClick={() => window.scrollTo(0, 0)}>
                <button className="px-8 py-3 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg">
                  Planning
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Main Image with green circle background */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Green circle background */}
              <div className="absolute inset-0 bg-[#7ACF8C] rounded-full"></div>
              {/* Image container */}
              <div className="relative w-[75%] aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={mainImage.src} 
                  alt={mainImage.alt} 
                  className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Small Images Row */}
        <div className="flex justify-center gap-6 mt-8">
          {smallImages.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageChange(image)}
              className={`w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl border-4 border-white shadow-lg ${
                mainImage.src === image.src ? "ring-4 ring-[#8ACBFF] scale-105" : ""
              }`}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
