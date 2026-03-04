import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
      question: "Question 1",
      answer: "Réponse à la question 1. Vous pouvez ajouter ici tout le contenu nécessaire pour expliquer ce point en détail.",
    },
    {
      id: 2,
      question: "Question 2",
      answer: "Réponse à la question 2. Cette section peut contenir des informations détaillées sur le sujet abordé.",
    },
    {
      id: 3,
      question: "Question 3",
      answer: "Réponse à la question 3. N'hésitez pas à développer autant que nécessaire pour clarifier le sujet.",
    },
    {
      id: 4,
      question: "Question 4",
      answer: "Réponse à la question 4. Apportez toutes les précisions utiles pour aider vos utilisateurs.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="inline-block bg-gray-200 px-8 py-3 text-2xl font-bold">
            FAQ
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-300">
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-left font-medium">{item.question}</span>
                {openItems.includes(item.id) ? (
                  <FaChevronUp className="text-gray-600 flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-gray-600 flex-shrink-0" />
                )}
              </button>

              {/* Answer Content */}
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4 pt-2 border-t border-gray-200">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
