import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import loginImage from "../assets/Login.jpg";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Mot de passe oublié - Data Chef";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Logique d'envoi de l'email de réinitialisation
    console.log("Réinitialisation pour:", email);
    setSubmitted(true);
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
                alt="Mot de passe oublié - Data Chef" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Form Section */}
            <div className="bg-[#8ACBFF] p-12 lg:p-16 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4 text-white">Mot de passe oublié ?</h1>
              <p className="text-white text-sm mb-10 opacity-90">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
              
              {!submitted ? (
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
                      className="w-full px-4 py-3 bg-white/20 border-2 border-white/40 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-[#8ACBFF] font-semibold py-3 rounded-xl transition-colors duration-300 shadow-md"
                  >
                    Envoyer le lien de réinitialisation
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
                    <p className="text-white text-center">
                      ✓ Un email de réinitialisation a été envoyé à <strong>{email}</strong>
                    </p>
                    <p className="text-white text-sm text-center mt-4 opacity-90">
                      Veuillez vérifier votre boîte de réception et suivre les instructions.
                    </p>
                  </div>

                  {/* Link back to Login */}
                  <div className="text-center pt-4">
                    <Link 
                      to="/connexion" 
                      className="inline-block bg-white hover:bg-gray-100 text-[#8ACBFF] font-semibold py-3 px-8 rounded-xl transition-colors duration-300 shadow-md"
                    >
                      Retour à la connexion
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

export default ForgotPasswordPage;
