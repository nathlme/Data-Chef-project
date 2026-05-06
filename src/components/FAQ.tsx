import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Comment fonctionne le planning automatique ?",
      answer: "Le planning automatique génère une semaine complète de repas en fonction de tes préférences alimentaires, du nombre de personnes et de ton emploi du temps. Tu peux personnaliser chaque repas en un glissement de doigt.",
    },
    {
      id: 2,
      question: "Est-ce que je peux ajouter mes propres ingrédients pour trouver des recettes ?",
      answer: "Oui ! Tu peux indiquer les ingrédients que tu as déjà dans ton frigo ou tes placards, et Data Chef te proposera des recettes adaptées pour éviter le gaspillage.",
    },
    {
      id: 3,
      question: "Est-ce que les recettes sont adaptées aux régimes alimentaires ?",
      answer: "Absolument ! Data Chef propose des recettes adaptées à tous les régimes : végétarien, végan, sans gluten, sans lactose, etc. Tu peux définir tes préférences dans ton profil.",
    },
    {
      id: 4,
      question: "Comment fonctionne la liste de courses automatique ?",
      answer: "Dès que tu valides ton planning, Data Chef génère automatiquement ta liste de courses avec tous les ingrédients nécessaires. Les quantités sont calculées précisément selon le nombre de portions.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 px-4 bg-gray-100 relative overflow-hidden">
      
      <div className="container mx-auto max-w-3xl relative z-10">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            FAQ
          </h2>
          <p className="text-gray-600">Toutes les réponses à tes questions</p>
        </div>

        {/* FAQ Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-12 mb-8">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between py-4 hover:opacity-80 transition-opacity"
                >
                  <span className="text-left font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 bg-[#8ACBFF] rounded-full flex items-center justify-center">
                    {openItems.includes(item.id) ? (
                      <FaMinus className="text-white text-sm" />
                    ) : (
                      <FaPlus className="text-white text-sm" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {openItems.includes(item.id) && (
                  <div className="pb-4 pt-2">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Tu as d'autres questions ?</p>
          <a href="/contact" className="inline-block">
            <button className="px-8 py-3 bg-[#8ACBFF] hover:bg-[#7AB8FF] text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg">
              Contactez-nous
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
