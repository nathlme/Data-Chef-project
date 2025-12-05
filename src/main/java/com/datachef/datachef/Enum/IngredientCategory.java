package com.datachef.datachef.Enum;

public enum IngredientCategory {

    VEGETABLE("vegetable", "Légume"),
    FRUIT("fruit", "Fruit"),
    MEAT("meat", "Viande"),
    FISH("fish", "Poisson"),
    SEAFOOD("seafood", "Fruit de mer"),
    DAIRY("dairy", "Produit laitier"),
    GRAIN("grain", "Céréale"),
    SPICE("spice", "Épice"),
    CONDIMENT("condiment", "Condiment"),
    HERB("herb", "Herbe aromatique"),
    OIL("oil", "Huile"),
    SWEETENER("sweetener", "Sucrant"),
    NUT("nut", "Noix"),
    LEGUME("legume", "Légumineuse");

    private final String value;
    private final String label;

    IngredientCategory(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() { return value; }
    public String getLabel() { return label; }
}
