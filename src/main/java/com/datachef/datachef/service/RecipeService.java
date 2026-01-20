package com.datachef.datachef.service;

import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.Users;

import java.util.Optional;
import java.util.UUID;

public interface RecipeService {


    Optional<RecipeDTO> getRecipeDTOFromName(String recipeName);
    RecipeDTO getRecipeDTOFromUUID(UUID recipeId);
    Recipe createRecipe(CreateRecipeDTO recipeDTO, Users currentUser);
}
