package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.MeasurementUnit;
import com.datachef.datachef.model.RecipeIngredient;

import java.math.BigDecimal;
import java.util.UUID;

public record RecipeIngredientDTO(
        UUID id,
        String name,
        String imageUrl,
        String quantity,
        boolean isOptional
) {
    public static RecipeIngredientDTO convertToDTO(RecipeIngredient recipeIngredient) {
        return new RecipeIngredientDTO(
                recipeIngredient.getId(),
                recipeIngredient.getIngredient().getName(),
                recipeIngredient.getIngredient().getImageUrl(),
                convertToQuantity(recipeIngredient.getQuantity(),recipeIngredient.getUnit()),
                recipeIngredient.getIsOptional()
        );
    }

    public static String convertToQuantity(BigDecimal quantity, MeasurementUnit unit) {
        return quantity + "" + unit;
    }

}
