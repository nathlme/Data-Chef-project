import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import miniLogo from "../assets/Mini logo cloud.png";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'inscription à la newsletter
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#8ACBFF] py-12 mt-auto text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-start gap-2 mb-3">
              <h3 className="text-2xl font-bold">DATA CHEF</h3>
              <img 
                src={miniLogo} 
                alt="Chef logo" 
                className="w-6 h-6 mt-1"
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Organise ta semaine culinaire en quelques secondes et cuisine l'esprit léger.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-white transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  to="/catalogue" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-white transition-colors"
                >
                  Catalogue
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ressources</h4>
            <ul className="space-y-2 text-white/90">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Link 
                  to="/catalogue" 
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-white transition-colors"
                >
                  Recettes
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nutrition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white/90 text-sm mb-4">
              Reçois nos meilleures recettes chaque semaine
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-grow px-4 py-2 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-[#8ACBFF] font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-white/80 text-sm">
            © 2025 Data Chef. Tous droits réservés
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-white" size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white" size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="text-white" size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <FaEnvelope className="text-white" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
