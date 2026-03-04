import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  content: string;
  avatar?: string;
}

const ReviewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    { id: 1, name: "Sophie", date: "12 Oct", rating: 5, content: "Je ne me prends plus la tête pour les repas. L'app est fun et ultra simple !" },
    { id: 2, name: "Marc", date: "15 Oct", rating: 5, content: "Une plateforme très intuitive et pratique." },
    { id: 3, name: "Julie", date: "18 Oct", rating: 4, content: "Je recommande vivement cette application !" },
    { id: 4, name: "Thomas", date: "20 Oct", rating: 5, content: "Des recettes variées et faciles à suivre." },
    { id: 5, name: "Emma", date: "22 Oct", rating: 5, content: "Parfait pour trouver de nouvelles idées !" },
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
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="inline-block bg-gray-200 px-8 py-3 text-2xl font-bold">
            Avis
          </h2>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="flex-shrink-0 w-20 h-10 bg-[#FF8559] hover:bg-[#FF6F3D] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Avis précédents"
          >
            <FaArrowLeftLong />
          </button>

          {/* Reviews Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow max-w-5xl">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#8ACBFF] p-6 rounded-2xl min-h-[180px] flex flex-col"
              >
                {/* Header avec avatar, nom et date */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">{review.name[0]}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>
                
                {/* Étoiles */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < review.rating ? "text-yellow-400" : "text-gray-300"}
                      size={16}
                    />
                  ))}
                </div>
                
                {/* Contenu de l'avis */}
                <p className="text-gray-700 italic">"{review.content}"</p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 w-20 h-10 bg-[#FF8559] hover:bg-[#FF6F3D] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Avis suivants"
          >
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
