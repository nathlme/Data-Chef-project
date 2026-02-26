package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.MeasurementUnit;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateRecipeIngredientDTO(
        UUID ingredientId,
        BigDecimal quantity,
        MeasurementUnit unit,
        String note,
        boolean isOptional
) {
}
