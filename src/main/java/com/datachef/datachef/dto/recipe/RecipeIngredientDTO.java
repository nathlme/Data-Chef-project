package com.datachef.datachef.dto.recipe;

public record RecipeIngredientDTO(
        int id,
        String name,
        String imageUrl,
        QuantityDTO quantity,
        boolean isOptional
) {

}
