package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.RecipeUtensil;

import java.util.UUID;

public record RecipeUtensilDTO(
        UUID id,
        String name,
        String imageUrl) {

    public static RecipeUtensilDTO convertToDTO(RecipeUtensil recipe) {
        return new RecipeUtensilDTO(
                recipe.getId(),
                recipe.getUtensil().getName(),
                recipe.getUtensil().getImageKey()
        );
    }
}
