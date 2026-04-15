package com.datachef.datachef.service;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.recipe.UpdateRecipeDTO;
import com.datachef.datachef.model.Recipe;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecipeService {


    Optional<RecipeDTO> getRecipeDTOFromName(String recipeName);
    Recipe createRecipe(CreateRecipeDTO recipeDTO, UserDetails userDetails, MultipartFile file);
    Recipe updateRecipe(UpdateRecipeDTO recipeDTO, UserDetails userDetails, UUID id, MultipartFile file) throws IOException;
    void deleteRecipe(UUID recipeId, UserDetails userDetails);
    List<RecipeDTO> getAllRecipe();
    List<RecipeDTO> search(String query, String difficulty, List<String> tags);
}
