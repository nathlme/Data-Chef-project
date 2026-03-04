import React from "react";
import { Link } from "react-router-dom";

interface Feature {
  id: number;
  title: string;
  description: string;
  color: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      title: "Catalogue de recettes intelligent",
      description: "Une sélection de recettes variées et adaptées à tes goûts. Data Chef apprend ce que tu aimes.",
      color: "text-[#FF8559]",
    },
    {
      id: 2,
      title: "Semainier personnalisé",
      description: "Ton planning repas auto-généré pour toute la semaine. Modifiable en un glissement de doigt.",
      color: "text-[#FF8559]",
    },
    {
      id: 3,
      title: "Liste de courses auto-magique",
      description: "Les ingrédients s'ajoutent tout seuls. Plus rien n'est oublié, jamais.",
      color: "text-[#FF8559]",
    },
    {
      id: 4,
      title: "Liste de courses auto-magique",
      description: "Un aperçu clair et fun de ton équilibre alimentaire. Manger mieux devient un jeu d'enfant.",
      color: "text-[#FF8559]",
    },
    {
      id: 5,
      title: "Cuisine avec ce qu'il te reste",
      description: "Indique ce que tu as dans ton frigo et tes placards. Data Chef te suggère instantanément des idées de recettes adaptées. Moins de gaspillage, plus de créativité.",
      color: "text-[#FF8559]",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-300 aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=800&fit=crop"
                alt="French toast with berries"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Features List */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Tout ce qu'il te faut pour cuisiner sereinement
            </h2>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="space-y-2">
                  <h3 className={`text-lg font-semibold ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="pt-4">
              <Link to="/catalogue" onClick={() => window.scrollTo(0, 0)}>
                <button className="px-8 py-3 bg-[#8ACBFF] hover:bg-[#7AB8E8] text-white rounded-full transition-colors cursor-pointer">
                  Recettes
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
