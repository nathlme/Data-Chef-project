package com.datachef.datachef.controller;

import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/:id")
    public ResponseEntity<RecipeDTO> getRecipe(@RequestParam String recipeId){
        return null;
    }

    public ResponseEntity<RecipeDTO> getRecipeFromName(@RequestParam String recipeName){
       RecipeDTO recipeDTO = recipeService.getRecipeDTOFromName(recipeName).orElseThrow();

       return ResponseEntity.ok(recipeDTO);
    }

    public ResponseEntity<List<RecipeDTO>> getAllRecipies(){return null;}
}
