package com.datachef.datachef.dto.mealplan;

import com.datachef.datachef.Enum.MealStatus;
import com.datachef.datachef.Enum.MealType;

import java.util.UUID;

public record PlannedMealDTO(
        UUID id,
        String recipeName,
        String recipeImageUrl,
        MealType mealType,
        short servings,
        MealStatus status
) {}
