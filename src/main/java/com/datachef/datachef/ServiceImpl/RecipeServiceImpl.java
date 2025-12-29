package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Override
    public Optional<RecipeDTO> getRecipeDTOFromName(String recipeName) {
        return Optional.empty();
    }

    @Override
    public Optional<RecipeDTO> getRecipeDTOFromId(UUID recipeId) {
        return Optional.empty();
    }
}
