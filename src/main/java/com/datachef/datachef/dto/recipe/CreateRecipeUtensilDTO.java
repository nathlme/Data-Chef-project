package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.NecessityLevel;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Ustensile à associer à une recette lors de sa création")
public record CreateRecipeUtensilDTO(

        @Schema(description = "UUID de l'ustensile", example = "550e8400-e29b-41d4-a716-446655440000", requiredMode = Schema.RequiredMode.REQUIRED)
        UUID utensilId,

        @Schema(description = "Niveau de nécessité de l'ustensile", example = "REQUIRED")
        NecessityLevel necessityLevel,

        @Schema(description = "Note d'utilisation", example = "Pour étaler la pâte uniformément")
        String note

) {}