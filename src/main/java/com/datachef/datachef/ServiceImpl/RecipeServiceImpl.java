package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.repository.RecipeRepository;
import com.datachef.datachef.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RecipeServiceImpl implements RecipeService {

    final RecipeRepository  recipeRepository;

    @Override
    public Optional<RecipeDTO> getRecipeDTOFromName(String recipeName) {
        return null;
    }

    @Override
    public RecipeDTO getRecipeDTOFromUUID(UUID recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RuntimeException("no recipe found"));
        return RecipeDTO.convertToDTO(recipe);
    }
}
