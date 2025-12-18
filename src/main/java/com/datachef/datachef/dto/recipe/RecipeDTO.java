package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.data.RecipeInstruction;

import java.util.List;

public record RecipeDTO(
        Integer id,
        String name,
        DurationDTO prepTime,
        DurationDTO cookTime,
        DurationDTO restTime,
        DurationDTO totalTime,
        Difficulty difficulty,
        Integer serving,
        List<RecipeInstruction> recipeInstructionList

) {
}
