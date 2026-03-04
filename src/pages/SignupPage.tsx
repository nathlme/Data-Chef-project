import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImage from "../assets/Login.jpg";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.title = "Inscription - Data Chef";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Logique d'inscription
    console.log("Inscription:", { email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="hidden lg:block">
              <img 
                src={loginImage} 
                alt="Inscription Data Chef" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Form Section */}
            <div className="bg-[#8ACBFF] p-8 lg:p-12 rounded-lg flex flex-col justify-center min-h-[600px]">
              <h1 className="text-4xl font-bold mb-8 text-white">Inscription</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@gmail.com"
                    required
                    className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Mot de passe confirmer
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-30 bg-white/30 hover:bg-white/40 text-white font-medium py-3 rounded-md transition-colors duration-300"
                >
                  Inscription
                </button>

                {/* Link to Login */}
                <p className="text-left text-sm text-white">
                  <Link to="/connexion" className="hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>

                {/* Social Login Buttons */}
                <div className="flex justify-left gap-4 pt-4">
                  <button
                    type="button"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <FaGoogle className="text-[#8ACBFF] text-xl" />
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <FaFacebookF className="text-[#8ACBFF] text-xl" />
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <FaApple className="text-[#8ACBFF] text-xl" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;
