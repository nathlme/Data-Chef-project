package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.NecessityLevel;

import java.util.UUID;

public record CreateRecipeUtensilDTO(
        UUID utensilId,
        NecessityLevel necessityLevel,
        String note
) {
}
