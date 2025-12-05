package com.datachef.datachef.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "user_custom_recipe_ingredients",
        indexes = {
                @Index(name = "idx_custom_recipe_ingredients_recipe", columnList = "custom_recipe_id"),
                @Index(name = "idx_custom_recipe_ingredients_ingredient", columnList = "ingredient_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_custom_recipe_ingredient", columnNames = {"custom_recipe_id", "ingredient_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCustomRecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "custom_recipe_id",
            nullable = false,
            foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (custom_recipe_id) REFERENCES user_custom_recipes(id) ON DELETE CASCADE")
    )
    private UserCustomRecipe customRecipe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "ingredient_id",
            nullable = false,
            foreignKey = @ForeignKey(foreignKeyDefinition = "FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE RESTRICT")
    )
    private Ingredient ingredient;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantity;

    @Column(nullable = false, length = 20)
    private String unit;

    @Column(name = "preparation_note", length = 200)
    private String preparationNote;

    @Column(name = "is_optional", nullable = false)
    @Builder.Default
    private Boolean isOptional = false;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Short displayOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}