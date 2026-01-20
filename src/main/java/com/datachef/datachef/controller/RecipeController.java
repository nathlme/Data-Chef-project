package com.datachef.datachef.controller;

import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/:id")
    public ResponseEntity<RecipeDTO> getRecipe(@RequestParam UUID recipeId){
        RecipeDTO recipe = recipeService.getRecipeDTOFromUUID(recipeId);
        return ResponseEntity.ok(recipe);
    }

    public ResponseEntity<RecipeDTO> createRecipe(CreateRecipeDTO createRecipeDTO){

    }

    public ResponseEntity<List<RecipeDTO>> getAllRecipies(){return null;}

    public ResponseEntity<RecipeDTO> updateRecipe(RecipeDTO recipeDTO){return null;}

    public ResponseEntity<Void>  deleteRecipe(RecipeDTO recipeDTO){return null;}

    public ResponseEntity<RecipeDTO> getRecipeFromName(@RequestParam String recipeName){
        RecipeDTO recipeDTO = recipeService.getRecipeDTOFromName(recipeName).orElseThrow();

        return ResponseEntity.ok(recipeDTO);
    }

    public ResponseEntity<List<RecipeDTO>> searchRecipes(@RequestParam String recipeName){return null;}
}
