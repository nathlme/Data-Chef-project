package com.datachef.datachef.Enum;

public enum NecessityLevel {

    ESSENTIAL("essential", "Essentiel"),
    RECOMMENDED("recommended", "Recommandé"),
    OPTIONAL("optional", "Optionnel");

    private final String value;
    private final String label;

    NecessityLevel(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public String getLabel() {
        return label;
    }

    public static NecessityLevel fromValue(String value) {
        for (NecessityLevel level : values()) {
            if (level.value.equalsIgnoreCase(value)) {
                return level;
            }
        }
        throw new IllegalArgumentException("Unknown necessity level: " + value);
    }
}
