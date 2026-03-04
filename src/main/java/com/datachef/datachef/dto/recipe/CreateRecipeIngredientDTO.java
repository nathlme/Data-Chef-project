package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.MeasurementUnit;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

@Schema(description = "Ingrédient à associer à une recette lors de sa création")
public record CreateRecipeIngredientDTO(

        @Schema(description = "UUID de l'ingrédient", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
        UUID ingredientId,

        @Schema(description = "Quantité de l'ingrédient", example = "200.00")
        BigDecimal quantity,

        @Schema(description = "Unité de mesure", example = "GRAM")
        MeasurementUnit unit,

        @Schema(description = "Note de préparation", example = "Épluché et coupé en dés")
        String note,

        @Schema(description = "Indique si l'ingrédient est optionnel", example = "false")
        boolean isOptional

) {}