import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImage from "../assets/Login.jpg";
import { validatePassword } from "../utils/passwordRules";

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Réinitialiser le mot de passe - Data Chef";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // TODO: Logique de réinitialisation du mot de passe avec le token
    console.log("Réinitialisation avec token:", token, "nouveau mot de passe:", password);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch shadow-2xl rounded-3xl overflow-hidden">
            {/* Image Section */}
            <div className="hidden lg:block">
              <img 
                src={loginImage} 
                alt="Réinitialiser le mot de passe - Data Chef" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Form Section */}
            <div className="bg-[#8ACBFF] p-12 lg:p-16 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4 text-white">Nouveau mot de passe</h1>
              <p className="text-white text-sm mb-10 opacity-90">
                Choisissez un nouveau mot de passe sécurisé pour votre compte.
              </p>
              
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                      Nouveau mot de passe
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
                      <p className="mt-2 text-xs text-white/90">
                        8 a 20 caracteres, minuscule, majuscule, chiffre, caractere special (!@#$%^&*) et sans espace.
                      </p>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 bg-white/20 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/20 border-2 border-red-500/40 rounded-xl p-3">
                      <p className="text-white text-sm text-center">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-[#8ACBFF] font-semibold py-3 rounded-xl transition-colors duration-300 shadow-md"
                  >
                    Réinitialiser le mot de passe
                  </button>

                  {/* Link back to Login */}
                  <div className="text-center pt-4">
                    <Link to="/connexion" className="text-sm text-white hover:underline">
                      ← Retour à la connexion
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/20 border-2 border-white/40 rounded-xl p-6">
                    <p className="text-white text-center text-lg font-semibold mb-2">
                      ✓ Mot de passe réinitialisé avec succès !
                    </p>
                    <p className="text-white text-sm text-center opacity-90">
                      Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                    </p>
                  </div>

                  {/* Link to Login */}
                  <div className="text-center pt-4">
                    <Link 
                      to="/connexion" 
                      className="inline-block bg-white hover:bg-gray-100 text-[#8ACBFF] font-semibold py-3 px-8 rounded-xl transition-colors duration-300 shadow-md"
                    >
                      Se connecter
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
