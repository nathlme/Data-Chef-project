package com.datachef.datachef.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class ShoppingListItem {

    @JsonProperty("ingredient_id")
    private UUID ingredientId;

    @JsonProperty("ingredient_name")
    private String ingredientName;

    @JsonProperty("quantity")
    private BigDecimal quantity;

    @JsonProperty("unit")
    private String unit;

    @JsonProperty("aisle")
    private String aisle;

    @JsonProperty("checked")
    private Boolean checked = false;

    @JsonProperty("recipes")
    private List<String> recipes;
}
