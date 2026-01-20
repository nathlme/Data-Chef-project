package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public record CreateRecipeDTO(
        String name,
        String description,
        Short prepTimeMinutes,
        Short cookTimeMinutes,
        Short restTimeMinutes,
        Difficulty difficulty,
        List<RecipeInstruction> instructions,
        List<String> tags,
        List<UUID> ingredientId,
        List<UUID> utensilId,
        Nutriscore nutriscore,
        MultipartFile image
) {
}
