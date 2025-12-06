package com.datachef.datachef.model;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.data.RecipeInstruction;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "user_custom_recipes",
        indexes = {
                @Index(name = "idx_custom_recipes_user", columnList = "user_id"),
                @Index(name = "idx_custom_recipes_base", columnList = "base_recipe_id"),
                @Index(name = "idx_custom_recipes_modified", columnList = "is_modified"),
                @Index(name = "idx_custom_recipes_folder", columnList = "user_id, folder")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_user_recipe_name", columnNames = {"user_id", "name"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCustomRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)  // ✅ Simple et clair
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "base_recipe_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)  // ✅ ON DELETE SET NULL
    private Recipe baseRecipe;

    // Flag modification
    @Column(name = "is_modified", nullable = false)
    private Boolean isModified = false;

    // Identité
    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    // Temps
    @Column(name = "prep_time_minutes", nullable = false)
    private Short prepTimeMinutes;

    @Column(name = "cook_time_minutes")
    @Builder.Default
    private Short cookTimeMinutes = 0;

    @Column(name = "rest_time_minutes")
    @Builder.Default
    private Short restTimeMinutes = 0;

    @Column(
            name = "total_time_minutes",
            insertable = false,
            updatable = false,
            columnDefinition = "SMALLINT GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes + rest_time_minutes) STORED"
    )
    private Short totalTimeMinutes;

    @Column(nullable = false)
    private Short servings = 4;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Difficulty difficulty;


    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "instructions", columnDefinition = "jsonb", nullable = false)
    private List<RecipeInstruction> instructions = new ArrayList<>();


    @Column(name = "tags", columnDefinition = "TEXT[]")
    private List<String> tags = new ArrayList<>();


    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "modifications_summary", columnDefinition = "TEXT")
    private String modificationsSummary;

    @Column(length = 100)
    @Builder.Default
    private String folder = "Mes recettes";

    @Column(name = "is_private", nullable = false)
    @Builder.Default
    private Boolean isPrivate = true;

    @OneToMany(mappedBy = "customRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserCustomRecipeIngredient> recipeIngredients = new ArrayList<>();

    @OneToMany(mappedBy = "customRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserCustomRecipeUtensil> recipeUtensils = new ArrayList<>();

    @OneToMany(mappedBy = "customRecipe")
    @Builder.Default
    private List<PlannedMeal> plannedMeals = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

}