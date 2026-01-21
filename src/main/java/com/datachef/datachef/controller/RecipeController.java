package com.datachef.datachef.controller;

import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipe(@PathVariable UUID id){
        RecipeDTO recipe = recipeService.getRecipeDTOFromUUID(id);
        return ResponseEntity.ok(recipe);
    }

    @PostMapping("/create")
    public ResponseEntity<RecipeDTO> createRecipe(@ModelAttribute CreateRecipeDTO createRecipeDTO){
         Recipe recipe = recipeService.createRecipe(createRecipeDTO);

        return ResponseEntity.ok(RecipeDTO.convertToDTO(recipe));
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
