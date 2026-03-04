package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.NecessityLevel;
import com.datachef.datachef.model.RecipeUtensil;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Ustensile d'une recette avec ses détails")
public record RecipeUtensilDTO(

        @Schema(description = "UUID de l'ustensile", example = "550e8400-e29b-41d4-a716-446655440000")
        UUID id,

        @Schema(description = "Nom de l'ustensile", example = "Rouleau à pâtisserie")
        String name,

        @Schema(description = "Niveau de nécessité", example = "REQUIRED")
        NecessityLevel necessityLevel,

        @Schema(description = "Note d'utilisation", example = "Pour étaler la pâte uniformément")
        String usageNote,

        @Schema(description = "URL de l'image de l'ustensile", example = "https://cdn.datachef.com/utensils/rouleau.jpg")
        String image

) {
    public static RecipeUtensilDTO convertToDTO(RecipeUtensil recipeUtensil) {
        return new RecipeUtensilDTO(
                recipeUtensil.getUtensil().getId(),
                recipeUtensil.getUtensil().getName(),
                recipeUtensil.getNecessityLevel(),
                recipeUtensil.getUsageNote(),
                recipeUtensil.getUtensil().getImageKey()
        );
    }
}