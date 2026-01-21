package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.model.*;
import com.datachef.datachef.repository.IngredientRepository;
import com.datachef.datachef.repository.RecipeRepository;
import com.datachef.datachef.repository.UtensilRepository;
import com.datachef.datachef.service.RecipeService;
import com.datachef.datachef.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
       if(!recipe.getImageKey().equals("recipe/default-recipe.jpg")){
           recipe.setImageKey(recipeImageService.getImageUrl(recipeId));
       }
        return RecipeDTO.convertToDTO(recipe);
    }

    @Override
    public Recipe createRecipe(CreateRecipeDTO recipeDTO) {

        //initialise a new Recipe with basic constructor
        Recipe newRecipe = new Recipe(
                recipeDTO.name(),
                recipeDTO.description(),
                recipeDTO.prepTimeMinutes(),
                recipeDTO.cookTimeMinutes(),
                recipeDTO.restTimeMinutes(),
                recipeDTO.difficulty(),
                recipeDTO.instructions(),
                recipeDTO.tags(),
                recipeDTO.nutriscore()
        );

        //set the user
        Users user = userService.getUserByUUID(recipeDTO.creator());
        newRecipe.setCreatedBy(user);

        //save to get an id
        Recipe savedRecipe = recipeRepository.save(newRecipe);


        //use the id to create an image Key
        if (recipeDTO.image() != null && !recipeDTO.image().isEmpty()) {
            try {
                String imageKey = recipeImageService.uploadImage(savedRecipe.getId(), recipeDTO.image());
                newRecipe.setImageKey(imageKey);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload recipe image", e);
            }
        } else {
            savedRecipe.setImageKey("recipe/default-recipe.jpg");
        }

        // retreive the RecipeIngredient, persistend throught cascade
        if (recipeDTO.ingredientId() != null && !recipeDTO.ingredientId().isEmpty()) {
            List<Ingredient> ingredients = ingredientRepository.findAllById(recipeDTO.ingredientId());

            if (ingredients.size() != recipeDTO.ingredientId().size()) {
                throw new RuntimeException("Some ingredients were not found");
            }

            Recipe finalSavedRecipe = savedRecipe;
            List<RecipeIngredient> recipeIngredients = ingredients.stream()
                    .map(ingredient -> {
                        RecipeIngredient ri = new RecipeIngredient();
                        ri.setRecipe(finalSavedRecipe);
                        ri.setIngredient(ingredient);
                        return ri;
                    })
                    .toList();

            savedRecipe.getRecipeIngredients().addAll(recipeIngredients);
        }

        //retreive the UtensilRecipe, persisted throught cascade
        if (recipeDTO.utensilId() != null && !recipeDTO.utensilId().isEmpty()) {
            List<Utensil> utensils = utensilRepository.findAllById(recipeDTO.utensilId());

            if (utensils.size() != recipeDTO.utensilId().size()) {
                throw new RuntimeException("Some utensils were not found");
            }

            Recipe finalSavedRecipe1 = savedRecipe;
            List<RecipeUtensil> recipeUtensils = utensils.stream()
                    .map(utensil -> {
                        RecipeUtensil ru = new RecipeUtensil();
                        ru.setRecipe(finalSavedRecipe1);
                        ru.setUtensil(utensil);
                        return ru;
                    })
                    .toList();

            savedRecipe.getRecipeUtensils().addAll(recipeUtensils);
        }

        savedRecipe = recipeRepository.save(savedRecipe);

        return savedRecipe;
    }
}
