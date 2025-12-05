package com.datachef.datachef.Enum;

public enum Aisle {
    FRUITS_LEGUMES("fruits_legumes", "Fruits et légumes"),
    BOUCHERIE("boucherie", "Boucherie"),
    POISSONNERIE("poissonnerie", "Poissonnerie"),
    EPICERIE_SALEE("epicerie_salee", "Épicerie salée"),
    EPICERIE_SUCREE("epicerie_sucree", "Épicerie sucrée"),
    FRAIS("frais", "Produits frais"),
    SURGELES("surgeles", "Surgelés"),
    CONDIMENTS("condiments", "Condiments et sauces"),
    AUTRE("autre", "Autre");

    private final String value;
    private final String label;

    Aisle(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() { return value; }
    public String getLabel() { return label; }
}
