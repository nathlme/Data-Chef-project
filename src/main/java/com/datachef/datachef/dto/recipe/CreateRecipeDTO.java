package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Données nécessaires pour créer une nouvelle recette")
public record CreateRecipeDTO(

        @Schema(description = "Nom de la recette", example = "Tarte aux pommes", requiredMode = Schema.RequiredMode.REQUIRED)
        String name,

        @Schema(description = "Description de la recette", example = "Une délicieuse tarte aux pommes maison")
        String description,

        @Schema(description = "Temps de préparation en minutes", example = "20")
        short prepTimeMinutes,

        @Schema(description = "Temps de cuisson en minutes", example = "40")
        short cookTimeMinutes,

        @Schema(description = "Temps de repos en minutes", example = "0")
        short restTimeMinutes,

        @Schema(description = "Niveau de difficulté", example = "EASY")
        Difficulty difficulty,

        @Schema(description = "Liste ordonnée des instructions")
        List<RecipeInstruction> instructions,

        @Schema(description = "Tags associés à la recette", example = "[\"dessert\", \"végétarien\"]")
        List<String> tags,

        @Schema(description = "UUID du créateur de la recette", example = "550e8400-e29b-41d4-a716-446655440000")
        UUID creator,

        @Schema(description = "Liste des ingrédients")
        List<CreateRecipeIngredientDTO> ingredient,

        @Schema(description = "Liste des ustensiles")
        List<CreateRecipeUtensilDTO> utensil,

        @Schema(description = "Score nutritionnel", example = "B")
        Nutriscore nutriscore

) {}