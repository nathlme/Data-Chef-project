package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import com.datachef.datachef.model.Recipe;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Représentation complète d'une recette")
public record RecipeDTO(

        @Schema(description = "Identifiant unique de la recette", example = "550e8400-e29b-41d4-a716-446655440000")
        UUID id,

        @Schema(description = "Nom de la recette", example = "Tarte aux pommes")
        String name,

        @Schema(description = "Temps de préparation")
        DurationDTO prepTime,

        @Schema(description = "Temps de cuisson")
        DurationDTO cookTime,

        @Schema(description = "Temps de repos")
        DurationDTO restTime,

        @Schema(description = "Temps total (préparation + cuisson + repos)")
        DurationDTO totalTime,

        @Schema(description = "Niveau de difficulté", example = "EASY")
        Difficulty difficulty,

        @Schema(description = "Nombre de portions", example = "4")
        short serving,

        @Schema(description = "Liste des instructions de la recette")
        List<RecipeInstruction> recipeInstructionList,

        @Schema(description = "Liste des ingrédients nécessaires")
        List<RecipeIngredientDTO> recipeIngredientList,

        @Schema(description = "Liste des ustensiles nécessaires")
        List<RecipeUtensilDTO> recipeUtensilList,

        @Schema(description = "Tags associés à la recette", example = "[\"dessert\", \"végétarien\"]")
        List<String> tags,

        @Schema(description = "Score nutritionnel", example = "B")
        Nutriscore nutriscore,

        @Schema(description = "URL de l'image de la recette", example = "https://cdn.datachef.com/recipes/tarte-pommes.jpg")
        String imageUrl

) {
    public static RecipeDTO convertToDTO(Recipe recipe) {
        return new RecipeDTO(
                recipe.getId(),
                recipe.getName(),
                DurationDTO.durationFromMinute(recipe.getPrepTimeMinutes()),
                DurationDTO.durationFromMinute(recipe.getCookTimeMinutes()),
                DurationDTO.durationFromMinute(recipe.getRestTimeMinutes()),
                DurationDTO.durationFromMinute(recipe.getTotalTimeMinutes()),
                recipe.getDifficulty(),
                recipe.getServings(),
                recipe.getInstructions(),
                recipe.getRecipeIngredients() == null ? null : recipe.getRecipeIngredients().stream().map(RecipeIngredientDTO::convertToDTO).toList(),
                recipe.getRecipeUtensils() == null ? null : recipe.getRecipeUtensils().stream().map(RecipeUtensilDTO::convertToDTO).toList(),
                recipe.getTags(),
                recipe.getNutriscore(),
                recipe.getImageKey()
        );
    }
}