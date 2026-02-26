package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.NecessityLevel;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.RecipeUtensil;

import java.util.UUID;

public record RecipeUtensilDTO(
        UUID id,
        String name,
        NecessityLevel necessityLevel,
        String usageNote,
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
