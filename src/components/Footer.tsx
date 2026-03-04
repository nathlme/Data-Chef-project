import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#8ACBFF] py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="hover:underline">Qui sommes-nous</a></li>
              <li><a href="#" className="hover:underline">Notre mission</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Recettes</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="/catalogue" className="hover:underline">Toutes les recettes</a></li>
              <li><a href="#" className="hover:underline">Catégories</a></li>
              <li><a href="#" className="hover:underline">Tendances</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Légal</h3>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="hover:underline">Mentions légales</a></li>
              <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:underline">CGU</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-400 text-center text-gray-600">
          <p>&copy; 2025 Data Chef. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
