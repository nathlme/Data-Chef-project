package com.datachef.datachef.Enum;

public enum Difficulty {
    EASY("easy", "Facile"),
    MEDIUM("medium", "Moyen"),
    HARD("hard", "Difficile");

    private final String value;
    private final String label;

    Difficulty(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() { return value; }
    public String getLabel() { return label; }
}