package com.datachef.datachef.controller;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.documentation.RecipeSwaggerApi;
import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.recipe.UpdateRecipeDTO;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/recipe")
public class RecipeController implements RecipeSwaggerApi {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipe(@PathVariable UUID id){
        RecipeDTO recipe = recipeService.getRecipeDTOFromUUID(id);
        return ResponseEntity.ok(recipe);
    }

    @PostMapping(path = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RecipeDTO> createRecipe(@RequestPart("recipe") CreateRecipeDTO recipeDetails, @RequestPart(value = "image", required = false) MultipartFile file){
         Recipe recipe = recipeService.createRecipe(recipeDetails, file);

        return ResponseEntity.ok(RecipeDTO.convertToDTO(recipe));
    }

    @PatchMapping(path="/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RecipeDTO> updateRecipe(UpdateRecipeDTO recipeDTO, @PathVariable UUID id, @RequestPart(value = "image") MultipartFile file) throws IOException {

        Recipe recipe = recipeService.updateRecipe(recipeDTO, id, file);

        return  ResponseEntity.ok(RecipeDTO.convertToDTO(recipe));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void>  deleteRecipe(@PathVariable UUID id){
            recipeService.deleteRecipe(id);
            return ResponseEntity.noContent().build();
    }

    @GetMapping(path="/name/{name}")
    public ResponseEntity<RecipeDTO> getRecipeFromName(@PathVariable String name){
        RecipeDTO recipeDTO = recipeService.getRecipeDTOFromName(name).orElseThrow(() -> new EntityNotFound(Recipe.class));

        return ResponseEntity.ok(recipeDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RecipeDTO>> search(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(required = false) List<String> tags
    ) {
        return ResponseEntity.ok(recipeService.search(query, difficulty, tags));
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<RecipeDTO>> getAllRecipes(){
        return ResponseEntity.ok(recipeService.getAllRecipe());
    }

}
