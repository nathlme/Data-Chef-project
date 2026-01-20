package com.datachef.datachef.service;

import com.datachef.datachef.dto.recipe.RecipeDTO;

import java.util.Optional;
import java.util.UUID;

public interface RecipeService {


    Optional<RecipeDTO> getRecipeDTOFromName(String recipeName);
    RecipeDTO getRecipeDTOFromUUID(UUID recipeId);
}
