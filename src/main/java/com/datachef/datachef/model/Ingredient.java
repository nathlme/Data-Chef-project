package com.datachef.datachef.model;


import com.datachef.datachef.Enum.Aisle;
import com.datachef.datachef.Enum.IngredientCategory;
import com.datachef.datachef.Enum.MeasurementUnit;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 200)
    private String name;

    @Column(name = "name_plural", length = 200)
    private String namePlural;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private IngredientCategory category;


    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Aisle aisle = Aisle.AUTRE;


    @Column(name = "allergens")
    private List<String> allergens = new ArrayList<>();


    @Column(name = "diet_tags")
    @ManyToMany
    @JoinTable(name = "ingredient_diet_type", joinColumns = @JoinColumn(name = "ingredient_id"), inverseJoinColumns = @JoinColumn(name = "diet_type_id"))
    private List<DietType> dietTags = new ArrayList<>();


    @Column(name = "common_units")
    @Enumerated(EnumType.STRING)
    private List<MeasurementUnit> commonUnits;

    // Substitutions possibles (array d'IDs)
    @Column(name = "substitutes", columnDefinition = "BIGINT[]")
    private List<Long> substitutes = new ArrayList<>();

    // Métadonnées
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    // Relation avec RecipeIngredient
    @OneToMany(mappedBy = "ingredient")
    private List<RecipeIngredient> recipeIngredients = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}
