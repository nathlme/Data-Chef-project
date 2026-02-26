package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.CreateRecipeIngredientDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.model.*;
import com.datachef.datachef.repository.IngredientRepository;
import com.datachef.datachef.repository.RecipeRepository;
import com.datachef.datachef.repository.UtensilRepository;
import com.datachef.datachef.service.RecipeService;
import com.datachef.datachef.service.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RecipeServiceImpl implements RecipeService {

    final RecipeRepository  recipeRepository;
    final RecipeImageService recipeImageService;
    final IngredientRepository ingredientRepository;
    final UtensilRepository utensilRepository;
    final UserService userService;

    @Override
    public Optional<RecipeDTO> getRecipeDTOFromName(String recipeName) {
        return null;
    }

    @Override
    public RecipeDTO getRecipeDTOFromUUID(UUID recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RuntimeException("no recipe found"));
        recipe.setImageKey(recipeImageService.getImageUrl(recipeId));

        return RecipeDTO.convertToDTO(recipe);
    }

    @Override
    @Transactional
    public Recipe createRecipe(CreateRecipeDTO recipeDTO, MultipartFile file) {

        Recipe newRecipe = new Recipe(
                recipeDTO.getName(),
                recipeDTO.getDescription(),
                recipeDTO.getPrepTimeMinutes(),
                recipeDTO.getCookTimeMinutes(),
                recipeDTO.getRestTimeMinutes(),
                recipeDTO.getDifficulty(),
                recipeDTO.getInstructions(),
                recipeDTO.getTags(),
                recipeDTO.getNutriscore()
        );

        Users user = userService.getUserByUUID(recipeDTO.getCreator());
        newRecipe.setCreatedBy(user);

        Recipe savedRecipe = recipeRepository.save(newRecipe);


        //use the id to create an image Key
        if (file != null) {
            try {
                String imageKey = recipeImageService.uploadImage(savedRecipe.getId(), file);
                newRecipe.setImageKey(imageKey);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload recipe image", e);
            }
        } else {
            savedRecipe.setImageKey("recipe/default-recipe.jpg");
        }

        if (recipeDTO.getIngredient() != null && !recipeDTO.getIngredient().isEmpty()) {

            Recipe finalSavedRecipe = savedRecipe;
            List<RecipeIngredient> recipeIngredients = recipeDTO.getIngredient().stream()
                    .map(ingredient -> {
                        RecipeIngredient ri = new RecipeIngredient();
                        ri.setQuantity(ingredient.quantity());
                        ri.setUnit(ingredient.unit());
                        ri.setIsOptional(ingredient.isOptional());
                        ri.setPreparationNote(ingredient.note());
                        ri.setRecipe(finalSavedRecipe);
                        Ingredient ingredientToSave = ingredientRepository.findById(ingredient.ingredientId()).orElseThrow(() -> new RuntimeException("no ingredient found with id " + ingredient.ingredientId()));
                        ri.setIngredient(Optional.of(ingredientToSave));
                        return ri;
                    })
                    .toList();

            savedRecipe.getRecipeIngredients().addAll(recipeIngredients);
        }

        if (recipeDTO.getUtensil() != null && !recipeDTO.getUtensil().isEmpty()) {

            Recipe finalSavedRecipe1 = savedRecipe;
            List<RecipeUtensil> recipeUtensils = recipeDTO.getUtensil().stream()
                    .map(utensil -> {
                        RecipeUtensil ru = new RecipeUtensil();
                        ru.setNecessityLevel(utensil.necessityLevel());
                        ru.setUsageNote(utensil.note());
                        ru.setRecipe(finalSavedRecipe1);
                        Utensil utensilToSave = utensilRepository.findById(utensil.utensilId()).orElseThrow(() -> new RuntimeException("utensil not found with id " + utensil.utensilId()));
                        ru.setUtensil(Optional.of(utensilToSave));
                        return ru;
                    })
                    .toList();

            savedRecipe.getRecipeUtensils().addAll(recipeUtensils);
        }

        savedRecipe = recipeRepository.save(savedRecipe);

        return savedRecipe;
    }
}
