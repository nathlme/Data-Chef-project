import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImage from "../assets/Login.jpg";
import { getApiErrorMessage } from "../api/errorMessages";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Connexion - Data Chef";
  }, []);

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      navigate("/profil", { replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await login({
        username: identifier,
        password,
      });

      navigate("/profil");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Une erreur inattendue est survenue.", "login"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
      <Header />
      
      <main className="grow pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch shadow-2xl rounded-3xl overflow-hidden">
            {/* Image Section */}
            <div className="hidden lg:block">
              <img 
                src={loginImage} 
                alt="Connexion Data Chef" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Form Section */}
            <div className="bg-[#8ACBFF] p-12 lg:p-16 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-10 text-white">Connexion</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Identifier Field */}
                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium text-white mb-2">
                    Nom d'utilisateur ou email
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="johndoe"
                    required
                    className="w-full px-4 py-3 bg-white/20 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all"
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
                    className="w-full px-4 py-3 bg-white/20 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all"
                  />
                </div>

                {errorMessage ? (
                  <p className="text-sm text-red-100 bg-red-500/60 rounded-lg px-3 py-2">{errorMessage}</p>
                ) : null}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-auto px-8 bg-white hover:bg-gray-100 text-[#8ACBFF] font-semibold py-3 rounded-xl transition-colors duration-300 shadow-md"
                >
                  {isSubmitting ? "Connexion..." : "Connexion"}
                </button>

                {/* Forgot Password Link */}
                <div className="text-left">
                  <Link to="/mot-de-passe-oublie" className="text-sm text-white hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Link to Signup */}
                <p className="text-left text-sm text-white">
                  <Link to="/inscription" className="hover:underline font-medium">
                    S'inscrire
                  </Link>
                </p>

                {/* Social Login Buttons */}
                <div className="flex justify-start gap-4 pt-4">
                  <button
                    type="button"
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                  >
                    <FaGoogle className="text-[#DB4437] text-xl" />
                  </button>
                  <button
                    type="button"
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                  >
                    <FaFacebookF className="text-[#1877F2] text-xl" />
                  </button>
                  <button
                    type="button"
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                  >
                    <FaApple className="text-black text-2xl" />
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

export default LoginPage;
