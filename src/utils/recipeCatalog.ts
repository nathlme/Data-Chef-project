import { recipes as localRecipes, type Recipe as LocalRecipe } from "../data/recipes";
import type { RecipeDTO, RecipeDifficulty } from "../api/modules/recipesApi";

export type CatalogueRecipe = {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: number;
  time: string;
  difficulty: string;
  servings: string;
  rating: number;
  detailPath?: string;
  tags: string[];
};

export function mapLocalRecipeToCatalogueRecipe(recipe: LocalRecipe): CatalogueRecipe {
  return {
    id: String(recipe.id),
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
    categoryId: recipe.categoryId,
    time: recipe.time,
    difficulty: recipe.difficulty,
    servings: recipe.servings,
    rating: recipe.rating,
    detailPath: `/recette/${recipe.id}`,
    tags: [],
  };
}

export function getLocalCatalogueRecipes(): CatalogueRecipe[] {
  return localRecipes.map(mapLocalRecipeToCatalogueRecipe);
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function findLocalFallbackRecipe(name: string): LocalRecipe | undefined {
  const normalizedName = normalize(name);

  return localRecipes.find((recipe) => {
    const normalizedRecipeName = normalize(recipe.name);
    return (
      normalizedRecipeName === normalizedName ||
      normalizedRecipeName.includes(normalizedName) ||
      normalizedName.includes(normalizedRecipeName)
    );
  });
}

export function formatDurationLabel(hours?: number, minutes?: number): string {
  const safeHours = hours ?? 0;
  const safeMinutes = minutes ?? 0;

  if (safeHours > 0 && safeMinutes > 0) {
    return `${safeHours}h ${String(safeMinutes).padStart(2, "0")} min`;
  }

  if (safeHours > 0) {
    return `${safeHours}h`;
  }

  return `${safeMinutes} min`;
}

export function formatDifficultyLabel(difficulty?: RecipeDifficulty | string): string {
  switch (difficulty) {
    case "EASY":
      return "Facile";
    case "MEDIUM":
      return "Intermédiaire";
    case "HARD":
      return "Difficile";
    case "Très facile":
    case "Facile":
    case "Intermédiaire":
    case "Difficile":
      return difficulty;
    default:
      return "Facile";
  }
}

function resolveCategoryId(tags: string[] | undefined, fallback?: LocalRecipe): number {
  if (fallback) {
    return fallback.categoryId;
  }

  const normalizedTags = (tags ?? []).map(normalize);

  if (normalizedTags.some((tag) => tag.includes("dessert"))) return 5;
  if (normalizedTags.some((tag) => tag.includes("vegetar") || tag.includes("vegan"))) return 4;
  if (normalizedTags.some((tag) => tag.includes("healthy") || tag.includes("equilibre") || tag.includes("leger"))) return 3;
  if (normalizedTags.some((tag) => tag.includes("rapide") || tag.includes("ital") || tag.includes("pate"))) return 2;

  return 1;
}

function resolveImage(dto: RecipeDTO, fallback?: LocalRecipe): string {
  if (fallback) {
    return fallback.image;
  }

  if (dto.imageUrl && /^https?:\/\//.test(dto.imageUrl)) {
    return dto.imageUrl;
  }

  return localRecipes[0]?.image ?? "";
}

export function mapRecipeDtoToCatalogueRecipe(dto: RecipeDTO): CatalogueRecipe {
  const fallback = findLocalFallbackRecipe(dto.name);
  const totalMinutes = (dto.totalTime?.hours ?? 0) * 60 + (dto.totalTime?.minutes ?? 0);
  const formattedTime = totalMinutes > 0 ? formatDurationLabel(dto.totalTime?.hours, dto.totalTime?.minutes) : fallback?.time ?? "--";

  return {
    id: String(dto.id),
    name: dto.name,
    description: dto.description ?? fallback?.description ?? "",
    image: resolveImage(dto, fallback),
    categoryId: resolveCategoryId(dto.tags, fallback),
    time: formattedTime,
    difficulty: formatDifficultyLabel(dto.difficulty),
    servings: String(dto.serving ?? fallback?.servings ?? "4"),
    rating: fallback?.rating ?? 0,
    detailPath: `/recette/${dto.id}`,
    tags: dto.tags ?? [],
  };
}
