import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaMinus, FaPlus, FaClock, FaUser, FaEuroSign } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getIngredientIcon, getUstensilIcon } from "../data/recipes";
import { apiClient } from "../api";
import { ApiError } from "../api/httpClient";
import type { RecipeDTO } from "../api/modules/recipesApi";
import {
  formatDifficultyLabel,
  mapRecipeDtoToCatalogueRecipe,
  type CatalogueRecipe,
} from "../utils/recipeCatalog";

type RecipeView = {
  id: string;
  name: string;
  image: string;
  time: string;
  difficulty: string;
  nutriscore: string;
  averagePrice: string;
  servings: number;
  categoryId: number;
  ingredients: Array<{ name: string; quantity: string; image?: string }>;
  ustensils: Array<{ name: string; image?: string }>;
  steps: string[];
};

type RelatedRecipe = {
  id: string;
  name: string;
  image: string;
  time: string;
  categoryId: number;
};

const isUuid = (value: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const resolveRecipeImage = (dto: RecipeDTO): string => {
  return dto.imageUrl ?? "";
};

const mapBackendRecipeToView = (dto: RecipeDTO): RecipeView => {
  const categoryId = mapRecipeDtoToCatalogueRecipe(dto).categoryId;

  const steps = (dto.recipeInstructionList ?? [])
    .slice()
    .sort((a, b) => (a.step ?? 0) - (b.step ?? 0))
    .map((instruction) => instruction.description?.trim())
    .filter((step): step is string => Boolean(step));

  return {
    id: String(dto.id),
    name: dto.name,
    image: resolveRecipeImage(dto),
    time: mapRecipeDtoToCatalogueRecipe(dto).time,
    difficulty: formatDifficultyLabel(dto.difficulty),
    nutriscore: dto.nutriscore ?? "-",
    averagePrice: "-",
    servings: dto.serving ?? 1,
    categoryId,
    ingredients: (dto.recipeIngredientList ?? []).map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity ?? "",
      image: ingredient.imageUrl,
    })),
    ustensils: (dto.recipeUtensilList ?? []).map((ustensil) => ({
      name: ustensil.name,
      image: ustensil.image,
    })),
    steps,
  };
};

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [servings, setServings] = useState(1);
  const [recipe, setRecipe] = useState<RecipeView | null>(null);
  const [otherRecipes, setOtherRecipes] = useState<RelatedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const ingredientsCarouselRef = useRef<HTMLDivElement | null>(null);
  const ustensilsCarouselRef = useRef<HTMLDivElement | null>(null);
  const otherRecipesCarouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carousels = [
      ingredientsCarouselRef.current,
      ustensilsCarouselRef.current,
      otherRecipesCarouselRef.current
    ].filter((element): element is HTMLDivElement => element !== null);

    const listeners = carousels.map((carousel) => {
      let isDragging = false;
      let hasDragged = false;
      let startX = 0;
      let startScrollLeft = 0;

      const onWheel = (event: WheelEvent) => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        if (maxScrollLeft <= 0) return;

        const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

        if (horizontalDelta === 0) return;

        const nextScrollLeft = Math.max(
          0,
          Math.min(maxScrollLeft, carousel.scrollLeft + horizontalDelta)
        );

        carousel.scrollLeft = nextScrollLeft;
        event.preventDefault();
        event.stopPropagation();
      };

      const onMouseDown = (event: MouseEvent) => {
        if (event.button !== 0) return;

        isDragging = true;
        hasDragged = false;
        startX = event.pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("cursor-grabbing");
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;

        const delta = event.pageX - startX;
        if (Math.abs(delta) > 4) {
          hasDragged = true;
        }

        carousel.scrollLeft = startScrollLeft - delta;
        event.preventDefault();
      };

      const stopDragging = () => {
        if (!isDragging) return;

        isDragging = false;
        carousel.classList.remove("cursor-grabbing");
      };

      const onClickCapture = (event: MouseEvent) => {
        if (!hasDragged) return;

        event.preventDefault();
        event.stopPropagation();
        hasDragged = false;
      };

      const onDragStart = (event: DragEvent) => {
        event.preventDefault();
      };

      carousel.addEventListener("wheel", onWheel, { passive: false });
      carousel.addEventListener("mousedown", onMouseDown);
      carousel.addEventListener("mousemove", onMouseMove);
      carousel.addEventListener("mouseleave", stopDragging);
      carousel.addEventListener("click", onClickCapture, true);
      carousel.addEventListener("dragstart", onDragStart);
      window.addEventListener("mouseup", stopDragging);

      return {
        carousel,
        onWheel,
        onMouseDown,
        onMouseMove,
        stopDragging,
        onClickCapture,
        onDragStart
      };
    });

    return () => {
      listeners.forEach(({
        carousel,
        onWheel,
        onMouseDown,
        onMouseMove,
        stopDragging,
        onClickCapture,
        onDragStart
      }) => {
        carousel.removeEventListener("wheel", onWheel);
        carousel.removeEventListener("mousedown", onMouseDown);
        carousel.removeEventListener("mousemove", onMouseMove);
        carousel.removeEventListener("mouseleave", stopDragging);
        carousel.removeEventListener("click", onClickCapture, true);
        carousel.removeEventListener("dragstart", onDragStart);
        window.removeEventListener("mouseup", stopDragging);
      });
    };
  }, [id]);
  
  // Fonction pour obtenir le nom et la couleur de la catégorie
  const getCategoryInfo = (categoryId: number) => {
    const categories = [
      { id: 1, name: "Plats Chauds", color: "#FFE5D9" },
      { id: 2, name: "Rapide", color: "#D9EDFF" },
      { id: 3, name: "Healthy", color: "#D9F5E5" },
      { id: 4, name: "Végétariens", color: "#E8F5E9" },
      { id: 5, name: "Desserts", color: "#FFE4F0" }
    ];
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };
  
  useEffect(() => {
    if (!id) {
      setRecipe(null);
      setOtherRecipes([]);
      setErrorMessage("Recette introuvable.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadRecipeData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const dto = await apiClient.recipes.getById(id);
        if (!isMounted) return;
        setRecipe(mapBackendRecipeToView(dto));

        try {
          const dtoList = await apiClient.recipes.getAll();
          if (!isMounted) return;

          const related = dtoList
            .filter((item) => String(item.id) !== id)
            .slice(0, 6)
            .map((item) => {
              const mapped: CatalogueRecipe = mapRecipeDtoToCatalogueRecipe(item);
              return {
                id: mapped.id,
                name: mapped.name,
                image: mapped.image,
                time: mapped.time,
                categoryId: mapped.categoryId,
              };
            });

          setOtherRecipes(related);
        } catch {
          if (!isMounted) return;
          setOtherRecipes([]);
        }
      } catch (error) {
        if (!isMounted) return;

        setRecipe(null);
        setOtherRecipes([]);

        if (error instanceof ApiError && error.status === 401) {
          setErrorMessage("Connecte-toi pour afficher cette recette.");
        } else {
          setErrorMessage("Impossible de charger les details de la recette.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadRecipeData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (recipe) {
      setServings(Math.max(1, recipe.servings));
    }
  }, [recipe]);

  // Mettre à jour le titre de la page
  useEffect(() => {
    if (recipe?.name) {
      document.title = `${recipe.name} - Data Chef`;
    } else if (isLoading) {
      document.title = "Chargement recette - Data Chef";
    } else {
      document.title = "Recette non trouvée - Data Chef";
    }
  }, [recipe, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="grow pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-lg text-gray-700">Chargement de la recette...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Si la recette n'existe pas, afficher un message
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="grow pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4">Recette non trouvée</h1>
            {errorMessage ? <p className="text-sm text-gray-600 mb-4">{errorMessage}</p> : null}
            <Link to="/catalogue" className="text-[#8ACBFF] hover:underline">
              Retour au catalogue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="grow pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Titre */}
          <h1 className="text-5xl font-bold text-center mb-12">{recipe.name}</h1>

          {/* Image principale avec cercle vert */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-[#7ACF8C] p-6 flex items-center justify-center">
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
          <div className="flex justify-center mb-10">
            <button className="bg-[#8ACBFF] text-white px-12 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
              Ajouter au planning
            </button>
          </div>

          {/* Informations rapides (temps, difficulté, portions) */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <div className="bg-[#8ACBFF] px-8 py-4 rounded-3xl flex flex-col items-center justify-center min-w-32.5 shadow-lg">
              <FaClock className="text-white text-2xl mb-2" />
              <span className="text-white font-semibold text-base mb-1">{recipe.time}</span>
              <span className="text-white text-xs opacity-80">Temps total</span>
            </div>
            <div className="bg-[#8ACBFF] px-8 py-4 rounded-3xl flex flex-col items-center justify-center min-w-32.5 shadow-lg">
              <GiChefToque className="text-white text-3xl mb-2" />
              <span className="text-white font-semibold text-base mb-1">{recipe.difficulty}</span>
              <span className="text-white text-xs opacity-80">Difficulté</span>
            </div>
            <div className="bg-[#8ACBFF] px-8 py-4 rounded-3xl flex flex-col items-center justify-center min-w-32.5 shadow-lg">
              <FaUser className="text-white text-2xl mb-2" />
              <span className="text-white font-semibold text-base mb-1">{recipe.nutriscore}</span>
              <span className="text-white text-xs opacity-80">Nutriscore</span>
            </div>
            <div className="bg-[#8ACBFF] px-8 py-4 rounded-3xl flex flex-col items-center justify-center min-w-32.5 shadow-lg">
              <FaEuroSign className="text-white text-2xl mb-2" />
              <span className="text-white font-semibold text-base mb-1">{recipe.averagePrice}</span>
              <span className="text-white text-xs opacity-80">Prix Moyen</span>
            </div>
          </div>

          {/* Compteur de portions */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <button 
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-10 h-10 rounded-full bg-[#8ACBFF] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors duration-300 shadow-md"
            >
              <FaMinus className="text-sm" />
            </button>
            <span className="text-lg font-medium px-4">{servings} personne{servings > 1 ? 's' : ''}</span>
            <button 
              onClick={() => setServings(servings + 1)}
              className="w-10 h-10 rounded-full bg-[#8ACBFF] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors duration-300 shadow-md"
            >
              <FaPlus className="text-sm" />
            </button>
          </div>

          {/* Section Ingrédients */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Ingrédients</h2>
            <div className="overflow-hidden">
              <div
                ref={ingredientsCarouselRef}
                className="flex gap-4 overflow-x-auto overscroll-x-contain scrollbar-hide -mb-4 pb-4 cursor-grab select-none"
              >
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow min-w-35 shrink-0"
                >
                  <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                    {ingredient.image ? (
                      <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-5xl">{getIngredientIcon(ingredient.name)}</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm mb-1">{ingredient.name}</p>
                  <p className="text-xs text-gray-500">{ingredient.quantity}</p>
                </div>
              ))}
              </div>
            </div>
          </section>

          {/* Section Ustensiles */}
          <section className="mb-16 relative">
            {/* Cercle décoratif bleu */}
            <div className="absolute -right-32 bottom-0 w-100 h-100 rounded-full bg-[#8ACBFF] opacity-30 -z-10"></div>
            
            <h2 className="text-3xl font-bold mb-6">Ustensiles</h2>
            <div className="overflow-hidden">
              <div
                ref={ustensilsCarouselRef}
                className="flex gap-4 overflow-x-auto overscroll-x-contain scrollbar-hide -mb-4 pb-4 cursor-grab select-none"
              >
              {recipe.ustensils.map((ustensil, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow min-w-35 shrink-0"
                  >
                    <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                      {ustensil.image ? (
                        <img src={ustensil.image} alt={ustensil.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-5xl">{getUstensilIcon(ustensil.name)}</span>
                      )}
                    </div>
                    <p className="font-semibold text-sm">{ustensil.name}</p>
                  </div>
                );
              })}              </div>            </div>
          </section>

          {/* Section Étapes */}
          <section className="mb-16 relative">
            
            <h2 className="text-3xl font-bold mb-6 relative z-10">Étapes</h2>
            <div className="bg-white rounded-3xl p-8 shadow-lg relative z-10">
              <div className="space-y-6">
                {recipe.steps.map((step, index) => (
                  <div key={index}>
                    <h3 className="text-[#8ACBFF] font-semibold mb-2">Étape {index + 1}</h3>
                    <p className="text-gray-800 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section Autres recettes */}
          <section className="mb-16 relative">
            {/* Cercle décoratif bleu en haut à droite */}
            <div className="absolute -right-40 -top-40 w-125 h-125 rounded-full bg-[#8ACBFF] opacity-30"></div>
            
            <h2 className="text-3xl font-bold mb-8 relative z-10">Autres recettes</h2>
            <div className="overflow-hidden">
              <div
                ref={otherRecipesCarouselRef}
                className="flex gap-6 overflow-x-auto overscroll-x-contain scrollbar-hide -mb-4 pb-4 relative z-10 cursor-grab select-none"
              >
                {otherRecipes.map((otherRecipe) => {
                  const category = getCategoryInfo(otherRecipe.categoryId);
                  return (
                    <Link
                      key={otherRecipe.id}
                      to={`/recette/${otherRecipe.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 shrink-0 w-62.5"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={otherRecipe.image} 
                          alt={otherRecipe.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Badge de temps */}
                        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-md">
                          <FaClock className="text-[#7CCB7D] text-sm" />
                          <span className="text-xs font-medium text-gray-700">{otherRecipe.time}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-base mb-2 text-gray-800">{otherRecipe.name}</h3>
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipePage;
