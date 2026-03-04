import React, { useState } from "react";
import { Link } from "react-router-dom";
import lasagnes from "../assets/lasagnes.jpg";
import pizza from "../assets/pizza.jpg";
import poulet from "../assets/poulet roti.jpg";
import salade from "../assets/salade cesar.jpg";
import tarte from "../assets/tarte aux pommes.jpg";

const Hero: React.FC = () => {
  const images = [
    { src: lasagnes, alt: "Lasagnes" },
    { src: pizza, alt: "Pizza Margherita" },
    { src: poulet, alt: "Poulet rôti" },
    { src: salade, alt: "Salade César" },
    { src: tarte, alt: "Tarte aux pommes" },
  ];

  const [mainImage, setMainImage] = useState(images[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageChange = (image: { src: string; alt: string }) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMainImage(image);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section className="pt-40 pb-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side */}
          <div className="space-y-6 pt-30">
            {/* Slogan */}
            <div className="bg-gray-200 px-6 py-3 inline-block">
              <h1 className="text-2xl font-bold italic">Cuisiner rend heureux</h1>
            </div>

            {/* Text Content */}
            <div className="bg-gray-200 p-6 min-h-[120px]">
              <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link to="/catalogue" onClick={() => window.scrollTo(0, 0)}>
              <button className="px-6 py-2 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white rounded-full transition-colors cursor-pointer">
                Recettes
              </button>
              </Link>
              <button className="px-6 py-2 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white rounded-full transition-colors cursor-pointer">
                Planning
              </button>
            </div>
          </div>

          {/* Right Side - Main Image */}
          <div className="bg-gray-500 aspect-[4/3] overflow-hidden rounded-lg">
            <img 
              src={mainImage.src} 
              alt={mainImage.alt} 
              className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </div>

        {/* Small Images Row */}
        <div className="grid grid-cols-5 gap-3 mt-8 max-w-2xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageChange(image)}
              className={`aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                mainImage.src === image.src ? "ring-4 ring-gray-500" : ""
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
