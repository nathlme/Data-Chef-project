package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;

import java.util.List;
import java.util.UUID;

public record UpdateRecipeDTO(
        String name,
        String description,
        Short prepTimeMinutes,
        Short cookTimeMinutes,
        Short restTimeMinutes,
        Difficulty difficulty,
        List<RecipeInstruction>instructions,
        List<String> tags,
        UUID creator,
        List<CreateRecipeIngredientDTO> ingredient,
        List<CreateRecipeUtensilDTO> utensil,
        Nutriscore nutriscore
) {
}
