import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getRecipeById, recipes, getIngredientIcon, getUstensilIcon } from "../data/recipes";

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Récupérer la recette depuis les données centralisées
  const recipe = getRecipeById(Number(id));

  // Mettre à jour le titre de la page
  useEffect(() => {
    if (recipe) {
      document.title = `${recipe.name} - Data Chef`;
    } else {
      document.title = "Recette non trouvée - Data Chef";
    }
  }, [recipe]);

  // Si la recette n'existe pas, afficher un message
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
        <Header />
        <main className="flex-grow pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4">Recette non trouvée</h1>
            <Link to="/catalogue" className="text-[#8ACBFF] hover:underline">
              Retour au catalogue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Obtenir 6 autres recettes aléatoires (différentes de la recette actuelle)
  const otherRecipes = recipes
    .filter(r => r.id !== recipe.id)
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3]">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Titre */}
          <h1 className="text-5xl font-bold text-center mb-12">{recipe.name}</h1>

          {/* Image principale avec cercle bleu */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-[#8ACBFF] p-6 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-lg">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bouton Ajouter au planning */}
          <div className="flex justify-center mb-8">
            <button className="bg-[#8ACBFF] text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
              Ajouter au planning
            </button>
          </div>

          {/* Informations rapides (temps, difficulté, portions) */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <div className="bg-gray-200 px-6 py-2 rounded-full">
              <span className="text-sm font-medium">{recipe.time}</span>
            </div>
            <div className="bg-gray-200 px-6 py-2 rounded-full">
              <span className="text-sm font-medium">{recipe.difficulty}</span>
            </div>
            <div className="bg-gray-200 px-6 py-2 rounded-full">
              <span className="text-sm font-medium">{recipe.servings} personnes</span>
            </div>
          </div>

          {/* Section Ingrédients */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Ingrédients</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="text-4xl mb-2">
                    {ingredient.image || getIngredientIcon(ingredient.name)}
                  </div>
                  <p className="font-medium text-sm">{ingredient.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{ingredient.quantity}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section Ustensiles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Ustensiles</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recipe.ustensils.map((ustensil, index) => {
                const ustensilData = typeof ustensil === 'string' 
                  ? { name: ustensil, image: undefined }
                  : ustensil;
                
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                  >
                    <div className="text-4xl mb-2">
                      {ustensilData.image || getUstensilIcon(ustensilData.name)}
                    </div>
                    <p className="font-medium text-sm">{ustensilData.name}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section Étapes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Étapes</h2>
            <div className="bg-gray-200 rounded-lg p-8">
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="font-bold text-[#FF8559] min-w-[30px]">{index + 1}.</span>
                    <p className="text-gray-800 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Section Autres recettes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Autres recettes</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {otherRecipes.map((otherRecipe) => (
                <Link
                  key={otherRecipe.id}
                  to={`/recette/${otherRecipe.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="min-w-[150px] cursor-pointer group"
                >
                  <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg mb-2 overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <img 
                      src={otherRecipe.image} 
                      alt={otherRecipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-center">{otherRecipe.name}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipePage;
