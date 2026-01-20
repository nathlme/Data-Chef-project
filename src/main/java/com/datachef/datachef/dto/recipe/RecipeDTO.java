package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import com.datachef.datachef.model.Recipe;

import java.util.List;
import java.util.UUID;

public record RecipeDTO(
        UUID id,
        String name,
        DurationDTO prepTime,
        DurationDTO cookTime,
        DurationDTO restTime,
        DurationDTO totalTime,
        Difficulty difficulty,
        Short serving,
        List<RecipeInstruction> recipeInstructionList,
        List<RecipeIngredientDTO> recipeIngredientList,
        List<RecipeUtensilDTO> recipeUtensilList,
        List<String> tags,
        Nutriscore nutriscore,
        String imageUrl

) {

    public static RecipeDTO convertToDTO(Recipe recipe) {
        return new RecipeDTO(
                recipe.getId(),
                recipe.getName(),
                DurationDTO.durationFromMinute(recipe.getPrepTimeMinutes()),
                DurationDTO.durationFromMinute(recipe.getCookTimeMinutes()),
                DurationDTO.durationFromMinute(recipe.getRestTimeMinutes()),
                DurationDTO.durationFromMinute(recipe.getTotalTimeMinutes()),
                recipe.getDifficulty(),
                recipe.getServings(),
                recipe.getInstructions(),
                recipe.getRecipeIngredients() == null ? null : recipe.getRecipeIngredients().stream().map(RecipeIngredientDTO::convertToDTO).toList(),
                recipe.getRecipeIngredients() == null ? null : recipe.getRecipeUtensils().stream().map(RecipeUtensilDTO::convertToDTO).toList(),
                recipe.getTags(),
                recipe.getNutriscore(),
                recipe.getImageKey()
                );

    }
}
