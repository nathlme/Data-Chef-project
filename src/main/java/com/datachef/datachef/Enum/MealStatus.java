package com.datachef.datachef.Enum;

public enum MealStatus {
    PLANNED("planned", "Planifié"),
    IN_PROGRESS("in_progress", "En cours"),
    COMPLETED("completed", "Terminé"),
    SKIPPED("skipped", "Sauté");

    private final String value;
    private final String label;

    MealStatus(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() { return value; }
    public String getLabel() { return label; }
}