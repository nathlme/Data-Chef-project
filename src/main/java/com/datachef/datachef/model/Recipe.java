package com.datachef.datachef.model;


import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.Enum.Nutriscore;
import com.datachef.datachef.data.RecipeInstruction;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

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

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private Short servings = 4;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "instructions", columnDefinition = "jsonb", nullable = false)
    private List<RecipeInstruction> instructions;

    @Column(
            name = "total_time_minutes",
            insertable = false,
            updatable = false,
            columnDefinition = "SMALLINT GENERATED ALWAYS AS (prep_time_minutes + cook_time_minutes + rest_time_minutes) STORED"
    )
    private Short totalTimeMinutes;

    @Column(name = "tags", columnDefinition = "TEXT[]")
    private List<String> tags;

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
    private List<RecipeIngredient> recipeIngredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeUtensil> recipeUtensils;

    private String imageKey;

    private Nutriscore nutriscore;

}
