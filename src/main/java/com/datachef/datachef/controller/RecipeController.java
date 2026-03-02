package com.datachef.datachef.controller;

import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.recipe.UpdateRecipeDTO;
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

    @PostMapping(path = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RecipeDTO> createRecipe(@RequestPart("recipe") CreateRecipeDTO recipeDetails, @RequestPart(value = "image", required = false) MultipartFile file){
         Recipe recipe = recipeService.createRecipe(recipeDetails, file);

        return ResponseEntity.ok(RecipeDTO.convertToDTO(recipe));
    }

    @PatchMapping(path="/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RecipeDTO> updateRecipe(UpdateRecipeDTO recipeDTO, @PathVariable UUID id, @RequestPart(value = "image", required = false) MultipartFile file){

        Recipe recipe;

        if(file.isEmpty()){
            recipe = recipeService.updateRecipeWithoutFile(recipeDTO, id);
        }else{
            recipe = recipeService.updateRecipe(recipeDTO, id, file);
        }
        return  ResponseEntity.ok(RecipeDTO.convertToDTO(recipe));
    }

    public ResponseEntity<Void>  deleteRecipe(RecipeDTO recipeDTO){return null;}

    public ResponseEntity<RecipeDTO> getRecipeFromName(@RequestParam String recipeName){
        RecipeDTO recipeDTO = recipeService.getRecipeDTOFromName(recipeName).orElseThrow();

        return ResponseEntity.ok(recipeDTO);
    }

    public ResponseEntity<List<RecipeDTO>> searchRecipes(@RequestParam String recipeName){return null;}

}
