package com.datachef.datachef.model;

import com.datachef.datachef.Enum.MealStatus;
import com.datachef.datachef.Enum.MealType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "planned_meals",
        indexes = {
                @Index(name = "idx_planned_meals_user_date", columnList = "user_id, meal_date"),
                @Index(name = "idx_planned_meals_recipe", columnList = "recipe_id"),
                @Index(name = "idx_planned_meals_custom_recipe", columnList = "custom_recipe_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlannedMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_recipe_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserCustomRecipe customRecipe;

    @Column(name = "meal_date", nullable = false)
    private LocalDate mealDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false, length = 20)
    private MealType mealType;

    @Column(nullable = false)
    @Builder.Default
    private Short servings = 4;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MealStatus status = MealStatus.PLANNED;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}