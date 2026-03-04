package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

@Schema(description = "Données pour mettre à jour une recette (tous les champs sont optionnels)")
public record UpdateRecipeDTO(

        @Schema(description = "Nouveau nom de la recette", example = "Tarte aux pommes revisitée")
        String name,

        @Schema(description = "Nouvelle description", example = "Une version revisitée de la tarte classique")
        String description,

        @Schema(description = "Nouveau temps de préparation en minutes", example = "25")
        Short prepTimeMinutes,

        @Schema(description = "Nouveau temps de cuisson en minutes", example = "35")
        Short cookTimeMinutes,

        @Schema(description = "Nouveau temps de repos en minutes", example = "10")
        Short restTimeMinutes,

        @Schema(description = "Nouveau niveau de difficulté", example = "MEDIUM")
        Difficulty difficulty,

        @Schema(description = "Nouvelle liste d'instructions")
        List<RecipeInstruction> instructions,

        @Schema(description = "Nouveaux tags", example = "[\"dessert\", \"fruits\"]")
        List<String> tags,

        @Schema(description = "UUID du créateur", example = "550e8400-e29b-41d4-a716-446655440000")
        UUID creator,

        @Schema(description = "Nouvelle liste d'ingrédients")
        List<CreateRecipeIngredientDTO> ingredient,

        @Schema(description = "Nouvelle liste d'ustensiles")
        List<CreateRecipeUtensilDTO> utensil,

        @Schema(description = "Nouveau score nutritionnel", example = "A")
        Nutriscore nutriscore

) {}