package com.datachef.datachef.dto.recipe;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import lombok.Data; // ou créer manuellement getters/setters
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Data
public class CreateRecipeDTO {
    private String name;
    private String description;
    private Short prepTimeMinutes;
    private Short cookTimeMinutes;
    private Short restTimeMinutes;
    private Difficulty difficulty;
    private List<RecipeInstruction> instructions;
    private List<String> tags;
    private UUID creator;
    private List<UUID> ingredientId;
    private List<UUID> utensilId;
    private Nutriscore nutriscore;
}