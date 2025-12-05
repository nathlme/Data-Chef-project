package com.datachef.datachef.model;

import com.datachef.datachef.Enum.MeasurementUnit;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "recipe_ingredients",
        indexes = {
                @Index(name = "idx_recipe_ingredients_recipe", columnList = "recipe_id"),
                @Index(name = "idx_recipe_ingredients_ingredient", columnList = "ingredient_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "unique_recipe_ingredient",
                        columnNames = {"recipe_id", "ingredient_id"}
                )
        }
)
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipe_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ingredient_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ingredient ingredient;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MeasurementUnit unit;

    @Column(name = "preparation_note", length = 200)
    private String preparationNote;

    @Column(name = "is_optional", nullable = false)
    private Boolean isOptional = false;

    @Column(name = "display_order", nullable = false)
    private Short displayOrder = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

}
