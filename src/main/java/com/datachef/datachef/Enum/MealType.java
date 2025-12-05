package com.datachef.datachef.Enum;

public enum MealType {
    BREAKFAST("breakfast", "Petit-déjeuner"),
    LUNCH("lunch", "Déjeuner"),
    DINNER("dinner", "Dîner"),
    SNACK("snack", "Collation");

    private final String value;
    private final String label;

    MealType(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() { return value; }
    public String getLabel() { return label; }
}