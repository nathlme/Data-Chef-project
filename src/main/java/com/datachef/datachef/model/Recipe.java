package com.datachef.datachef.model;


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
@Table(
        name = "recipe",
        indexes = {
                @Index(name = "idx_recipes_difficulty", columnList = "difficulty"),
                @Index(name = "idx_recipes_time", columnList = "total_time_minutes"),
                @Index(name = "idx_recipes_servings", columnList = "servings")
        }
)
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    @Lob
    private String  description;

    @Column(name = "prep_time_minutes", nullable = false)
    private Short prepTimeMinutes;

    @Column(name = "cook_time_minutes", nullable = false)
    private Short cookTimeMinutes = 0;

    @Column(name = "rest_time_minutes", nullable = false)
    private Short restTimeMinutes = 0;

    @OneToMany(mappedBy = "recipe")
    private List<UserRating> ratings = new ArrayList<>();

    @Column(
            name = "total_time_minutes",
            insertable = false,
            updatable = false,
            columnDefinition = "SMALLINT GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes + rest_time_minutes) STORED"
    )
    private Short totalTimeMinutes;

    @Column(name = "tags", columnDefinition = "TEXT[]")
    private List<String> tags = new ArrayList<>();

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private Users createdBy;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeIngredient> recipeIngredients = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeUstensil> recipeUtensils = new ArrayList<>();

    private String imageUrl;

}
