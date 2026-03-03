package com.datachef.datachef.service;

import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.recipe.UpdateRecipeDTO;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.Users;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

public interface RecipeService {


    Optional<RecipeDTO> getRecipeDTOFromName(String recipeName);
    RecipeDTO getRecipeDTOFromUUID(UUID recipeId);
    Recipe createRecipe(CreateRecipeDTO recipeDTO, MultipartFile file);
    Recipe updateRecipe(UpdateRecipeDTO recipeDTO, UUID id, MultipartFile file) throws IOException;
}
