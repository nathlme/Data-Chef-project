package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.recipe.*;
import com.datachef.datachef.exception.EntityNotFound;
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

        Users user = userService.getUserByUUID(recipeDTO.creator());
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

        if (recipeDTO.ingredient() != null && !recipeDTO.ingredient().isEmpty()) {
            List<RecipeIngredient> recipeIngredients = handleIngredientRelation(savedRecipe, recipeDTO.ingredient());
            savedRecipe.getRecipeIngredients().addAll(recipeIngredients);
        }

        if (recipeDTO.utensil() != null && !recipeDTO.utensil().isEmpty()) {
            List<RecipeUtensil> recipeUtensils = handleUtensilRelation(savedRecipe, recipeDTO.utensil());
            savedRecipe.getRecipeUtensils().addAll(recipeUtensils);
        }

        savedRecipe = recipeRepository.save(savedRecipe);

        return savedRecipe;
    }

    @Override
    @Transactional
    public Recipe updateRecipe(UpdateRecipeDTO recipeDTO, UUID id, MultipartFile file) {
        return null;
    }

    @Override
    @Transactional
    public Recipe updateRecipeWithoutFile(UpdateRecipeDTO recipeDTO, UUID id) {
        Recipe recipeToUpdate = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("no recipe found"));

        recipeToUpdate.setName(recipeDTO.name());
        recipeToUpdate.setDescription(recipeDTO.description());
        recipeToUpdate.setCookTimeMinutes(recipeDTO.cookTimeMinutes());
        recipeToUpdate.setDifficulty(recipeDTO.difficulty());
        recipeToUpdate.setInstructions(recipeDTO.instructions());
        recipeToUpdate.setTags(recipeDTO.tags());
        recipeToUpdate.setNutriscore(recipeDTO.nutriscore());

        if(recipeDTO.ingredient() != null && !recipeDTO.ingredient().isEmpty()) {
            List<RecipeIngredient> recipeIngredientToUpdate = handleIngredientRelation(recipeToUpdate, recipeDTO.ingredient());
            recipeToUpdate.getRecipeIngredients().clear();
            recipeRepository.saveAndFlush(recipeToUpdate);
            recipeToUpdate.getRecipeIngredients().addAll(recipeIngredientToUpdate);
        }

        if(recipeDTO.utensil() != null && !recipeDTO.utensil().isEmpty()) {
            List<RecipeUtensil> recipeUtensilToUpdate = handleUtensilRelation(recipeToUpdate, recipeDTO.utensil());
            recipeToUpdate.getRecipeUtensils().clear();
            recipeRepository.saveAndFlush(recipeToUpdate);
            recipeToUpdate.getRecipeUtensils().addAll(recipeUtensilToUpdate);
        }

        recipeRepository.save(recipeToUpdate);
        return recipeToUpdate;
    }

    private List<RecipeUtensil> handleUtensilRelation(Recipe recipeToUpdate, List<CreateRecipeUtensilDTO> utensil2) {
        return utensil2.stream().map(utensil -> {
            RecipeUtensil updateRu = new RecipeUtensil();
            updateRu.setNecessityLevel(utensil.necessityLevel());
            updateRu.setUsageNote(utensil.note());
            updateRu.setRecipe(recipeToUpdate);
            Utensil utensilToSave = utensilRepository.findById(utensil.utensilId()).orElseThrow(() -> new EntityNotFound(Utensil.class));
            updateRu.setUtensil(Optional.of(utensilToSave));
            return updateRu;
        }).toList();
    }

    private List<RecipeIngredient> handleIngredientRelation(Recipe recipeToUpdate, List<CreateRecipeIngredientDTO> ingredient2) {
        return ingredient2.stream().map(ingredient -> {
                    RecipeIngredient updateRi = new RecipeIngredient();
                    updateRi.setQuantity(ingredient.quantity());
                    updateRi.setUnit(ingredient.unit());
                    updateRi.setIsOptional(ingredient.isOptional());
                    updateRi.setPreparationNote(ingredient.note());
                    updateRi.setRecipe(recipeToUpdate);
                    Ingredient ingredientToSave = ingredientRepository.findById(ingredient.ingredientId()).orElseThrow(() -> new EntityNotFound(Ingredient.class));
                    updateRi.setIngredient(Optional.of(ingredientToSave));
                    return updateRi;
                }).toList();
    }
}
