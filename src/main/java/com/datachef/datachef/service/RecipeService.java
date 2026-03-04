package com.datachef.datachef.service;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.recipe.UpdateRecipeDTO;
import com.datachef.datachef.model.Recipe;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecipeService {


    Optional<RecipeDTO> getRecipeDTOFromName(String recipeName);
    RecipeDTO getRecipeDTOFromUUID(UUID recipeId);
    Recipe createRecipe(CreateRecipeDTO recipeDTO, MultipartFile file);
    Recipe updateRecipe(UpdateRecipeDTO recipeDTO, UUID id, MultipartFile file) throws IOException;
    void deleteRecipe(UUID recipeId);
    List<RecipeDTO> getAllRecipe();
    List<RecipeDTO> search(String query, Difficulty difficulty, List<String> tags);
}
