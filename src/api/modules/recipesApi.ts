import type { HttpClient } from "../httpClient";

export type RecipeDifficulty = "EASY" | "MEDIUM" | "HARD";

export type RecipeDuration = {
  hours?: number;
  minutes?: number;
};

export type RecipeInstruction = {
  step?: number;
  title?: string;
  description?: string;
  durationMinutes?: number;
  duration_minutes?: number;
  imageUrl?: string;
  image_url?: string;
};

export type RecipeIngredientDTO = {
  id: string;
  name: string;
  imageUrl?: string;
  quantity?: string;
  isOptional?: boolean;
  note?: string;
};

export type RecipeUtensilDTO = {
  id: string;
  name: string;
  necessityLevel?: string;
  usageNote?: string;
  image?: string;
};

export type RecipeDTO = {
  id: string;
  name: string;
  description?: string;
  prepTime?: RecipeDuration;
  cookTime?: RecipeDuration;
  restTime?: RecipeDuration;
  totalTime?: RecipeDuration;
  difficulty?: RecipeDifficulty;
  serving?: number;
  tags?: string[];
  nutriscore?: string;
  imageUrl?: string;
  recipeInstructionList?: RecipeInstruction[];
  recipeIngredientList?: RecipeIngredientDTO[];
  recipeUtensilList?: RecipeUtensilDTO[];
};

export type SearchRecipeParams = {
  query?: string;
  difficulty?: RecipeDifficulty;
  tags?: string[];
};

export type RecipesApi = {
  getAll: () => Promise<RecipeDTO[]>;
  getById: (id: string) => Promise<RecipeDTO>;
  getByName: (name: string) => Promise<RecipeDTO>;
  search: (params?: SearchRecipeParams) => Promise<RecipeDTO[]>;
  create: (formData: FormData) => Promise<RecipeDTO>;
  update: (id: string, formData: FormData) => Promise<RecipeDTO>;
  deleteById: (id: string) => Promise<void>;
};

export function createRecipesApi(http: HttpClient): RecipesApi {
  return {
    getAll: () => http.get<RecipeDTO[]>("/api/recipe/all"),
    getById: (id) => http.get<RecipeDTO>(`/api/recipe/${id}`),
    getByName: (name) => http.get<RecipeDTO>(`/api/recipe/name/${encodeURIComponent(name)}`),
    search: (params) =>
      http.get<RecipeDTO[]>("/api/recipe/search", {
        query: params?.query,
        difficulty: params?.difficulty,
        tags: params?.tags,
      }),
    create: (formData) => http.post<RecipeDTO>("/api/recipe/create", formData, { authenticated: true }),
    update: (id, formData) => http.patch<RecipeDTO>(`/api/recipe/update/${id}`, formData, { authenticated: true }),
    deleteById: (id) => http.delete<void>(`/api/recipe/${id}`, { authenticated: true }),
  };
}
