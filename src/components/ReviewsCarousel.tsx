import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface Review {
  id: number;
  name: string;
  age: string;
  rating: number;
  content: string;
  avatar?: string;
}

const ReviewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    { 
      id: 1, 
      name: "Samir", 
      age: "12 ans", 
      rating: 5, 
      content: "Je ne me prends plus la tête pour les repas. L'app est fun et ultra simple !" 
    },
    { 
      id: 2, 
      name: "Camille", 
      age: "30 ans", 
      rating: 5, 
      content: "Une plateforme très intuitive et pratique pour cuisiner. Maintenant, Data Chef me propose tout ! Sans prise de tête et c'est super agréable." 
    },
    { 
      id: 3, 
      name: "Elodie", 
      age: "21 ans", 
      rating: 5, 
      content: "Avec Data Chef, finis les soucis. Le dashboard nutritionnel est hyper clair..." 
    },
    { 
      id: 4, 
      name: "Thomas", 
      age: "28 ans", 
      rating: 5, 
      content: "Des recettes variées et faciles à suivre. J'adore !" 
    },
    { 
      id: 5, 
      name: "Emma", 
      age: "25 ans", 
      rating: 4, 
      content: "Parfait pour trouver de nouvelles idées de repas chaque semaine." 
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Gestion circulaire des avis visibles
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Avis
          </h2>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="hidden md:flex flex-shrink-0 w-12 h-12 bg-[#FF8559] hover:bg-[#FF6F3D] text-white rounded-full items-center justify-center transition-colors shadow-md hover:shadow-lg"
            aria-label="Avis précédents"
          >
            <FaArrowLeftLong size={20} />
          </button>

          {/* Reviews Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow max-w-6xl">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#8ACBFF] p-6 rounded-2xl min-h-[200px] flex flex-col shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Header avec avatar, nom et âge */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${review.name}&background=random&size=56`}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-white text-lg">{review.name}</h3>
                    <p className="text-sm text-white opacity-90">{review.age}</p>
                  </div>
                </div>
                
                {/* Étoiles */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < review.rating ? "text-yellow-300" : "text-white opacity-30"}
                      size={18}
                    />
                  ))}
                </div>
                
                {/* Contenu de l'avis */}
                <p className="text-white leading-relaxed flex-grow">
                  {review.content}
                </p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="hidden md:flex flex-shrink-0 w-12 h-12 bg-[#FF8559] hover:bg-[#FF6F3D] text-white rounded-full items-center justify-center transition-colors shadow-md hover:shadow-lg"
            aria-label="Avis suivants"
          >
            <FaArrowRightLong size={20} />
          </button>
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            onClick={handlePrevious}
            className="w-12 h-12 bg-[#FF8559] hover:bg-[#FF6F3D] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
            aria-label="Avis précédents"
          >
            <FaArrowLeftLong size={18} />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 bg-[#FF8559] hover:bg-[#FF6F3D] text-white rounded-full flex items-center justify-center transition-colors shadow-md"
            aria-label="Avis suivants"
          >
            <FaArrowRightLong size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
