package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.MeasurementUnit;
import com.datachef.datachef.model.RecipeIngredient;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

@Schema(description = "Ingrédient d'une recette avec ses détails")
public record RecipeIngredientDTO(

        @Schema(description = "UUID de l'ingrédient", example = "550e8400-e29b-41d4-a716-446655440000")
        UUID id,

        @Schema(description = "Nom de l'ingrédient", example = "Pomme")
        String name,

        @Schema(description = "URL de l'image de l'ingrédient", example = "https://cdn.datachef.com/ingredients/pomme.jpg")
        String imageUrl,

        @Schema(description = "Quantité avec unité formatée", example = "200g")
        String quantity,

        @Schema(description = "Indique si l'ingrédient est optionnel", example = "false")
        boolean isOptional,

        @Schema(description = "Note de préparation", example = "Épluché et coupé en dés")
        String note

) {
    public static RecipeIngredientDTO convertToDTO(RecipeIngredient recipeIngredient) {
        return new RecipeIngredientDTO(
                recipeIngredient.getIngredient().getId(),
                recipeIngredient.getIngredient().getName(),
                recipeIngredient.getIngredient().getImageKey(),
                convertToQuantity(recipeIngredient.getQuantity(), recipeIngredient.getUnit()),
                recipeIngredient.getIsOptional(),
                recipeIngredient.getPreparationNote()
        );
    }

    public static String convertToQuantity(BigDecimal quantity, MeasurementUnit unit) {
        return quantity + "" + unit;
    }
}