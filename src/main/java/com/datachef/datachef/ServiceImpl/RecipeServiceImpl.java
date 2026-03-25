package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.dto.image.ImageUploadResult;
import com.datachef.datachef.dto.recipe.*;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.*;
import com.datachef.datachef.repository.IngredientRepository;
import com.datachef.datachef.repository.RecipeRepository;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.repository.UtensilRepository;
import com.datachef.datachef.service.ImageService;
import com.datachef.datachef.service.RecipeService;
import com.datachef.datachef.specification.RecipeSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RecipeServiceImpl implements RecipeService {

    final RecipeRepository  recipeRepository;

    @Qualifier("recipeImageService")
    final ImageService  imageService;

    final IngredientRepository ingredientRepository;

    final UtensilRepository utensilRepository;

    final UserRepository userRepository;

    @Override
    public Optional<RecipeDTO> getRecipeDTOFromName(String recipeName) {
        return recipeRepository.findByName(recipeName)
                .map(RecipeDTO::convertToDTO);
    }

    @Autowired
    public RecipeServiceImpl(
            RecipeRepository recipeRepository,
            @Qualifier("recipeImageService") ImageService imageService,
            IngredientRepository ingredientRepository,
            UtensilRepository utensilRepository,
            UserRepository userRepository
    ) {
        this.recipeRepository = recipeRepository;
        this.imageService = imageService;
        this.ingredientRepository = ingredientRepository;
        this.utensilRepository = utensilRepository;
        this.userRepository = userRepository;
    }

    @Override
    public RecipeDTO getRecipeDTOFromUUID(UUID recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RuntimeException("no recipe found"));
        recipe.setImageKey(imageService.getImageUrl(recipeId));
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

        Users user = userRepository.findById(recipeDTO.creator()).orElseThrow(() -> new EntityNotFound(Users.class));
        newRecipe.setCreatedBy(user);

        Recipe savedRecipe = recipeRepository.save(newRecipe);

        //use the id to create an image Key
        if (file != null) {
            try {
                ImageUploadResult uploadResult = imageService.uploadImage(savedRecipe.getId(), file);
                savedRecipe.setImageKey(uploadResult.imageKey());
                savedRecipe.setImageHash(uploadResult.imageHash());
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload recipe image", e);
            }
        } else {
            savedRecipe.setImageKey("recipe/default-recipe.jpg");
            savedRecipe.setImageHash(null);
        }

        if (recipeDTO.ingredient() != null && !recipeDTO.ingredient().isEmpty()) {
            List<RecipeIngredient> recipeIngredients = handleIngredientRelation(savedRecipe, recipeDTO.ingredient());
            savedRecipe.getRecipeIngredients().addAll(recipeIngredients);
        }

        if (recipeDTO.utensil() != null && !recipeDTO.utensil().isEmpty()) {
            List<RecipeUtensil> recipeUtensils = handleUtensilRelation(savedRecipe, recipeDTO.utensil());
            savedRecipe.getRecipeUtensils().addAll(recipeUtensils);
        }

        return recipeRepository.save(savedRecipe);

    }

    @Override
    @Transactional
    public Recipe updateRecipe(UpdateRecipeDTO recipeDTO, UUID id, MultipartFile file) throws IOException {
        Recipe recipeToUpdate = recipeRepository.findById(id).orElseThrow(() -> new EntityNotFound(Recipe.class));

        recipeToUpdate.setName(recipeDTO.name());
        recipeToUpdate.setDescription(recipeDTO.description());
        recipeToUpdate.setCookTimeMinutes(recipeDTO.cookTimeMinutes());
        recipeToUpdate.setDifficulty(recipeDTO.difficulty());
        recipeToUpdate.setInstructions(recipeDTO.instructions());
        recipeToUpdate.setTags(recipeDTO.tags());
        recipeToUpdate.setNutriscore(recipeDTO.nutriscore());

        if (file != null && !file.isEmpty()) {
            byte[] fileBytes = file.getBytes();
            String newHash = DigestUtils.md5DigestAsHex(fileBytes);
            if (!newHash.equals(recipeToUpdate.getImageHash())) {
                ImageUploadResult uploadResult = imageService.uploadImage(id, file);
                recipeToUpdate.setImageHash(uploadResult.imageHash());
                recipeToUpdate.setImageKey(uploadResult.imageKey());
            }
        }

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

    @Override
    @Transactional
    public void deleteRecipe(UUID recipeId) {
            recipeRepository.deleteById(recipeId);
            imageService.deleteImage(recipeId);
    }

    @Override
    public List<RecipeDTO> getAllRecipe() {
        List<Recipe> recipes = recipeRepository.findAll();
        if(recipes.isEmpty()){
            throw new EntityNotFound(Recipe.class);
        }

        return recipes.stream().map(RecipeDTO::convertToDTO).toList();
    }

    public List<RecipeDTO> search(String query, Difficulty difficulty, List<String> tags) {
        Specification<Recipe> spec = Specification
                .where(RecipeSpecification.hasName(query))
                .and(RecipeSpecification.hasDifficulty(difficulty))
                .and(RecipeSpecification.hasTags(tags));

        return recipeRepository.findAll(spec)
                .stream()
                .map(RecipeDTO::convertToDTO)
                .toList();
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
