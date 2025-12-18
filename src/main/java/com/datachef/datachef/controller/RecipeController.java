package com.datachef.datachef.controller;

import com.datachef.datachef.model.Recipe;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/recipe")
public class RecipeController {

    public Recipe getRecipe(@RequestParam String recipeId){
        return null;
    }
}
