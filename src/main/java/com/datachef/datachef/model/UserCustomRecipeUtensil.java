package com.datachef.datachef.model;

import com.datachef.datachef.Enum.NecessityLevel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "user_custom_recipe_utensils",
        indexes = {
                @Index(name = "idx_custom_recipe_utensils_recipe", columnList = "custom_recipe_id"),
                @Index(name = "idx_custom_recipe_utensils_utensil", columnList = "utensil_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "unique_custom_recipe_utensil", columnNames = {"custom_recipe_id", "utensil_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCustomRecipeUtensil {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "custom_recipe_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserCustomRecipe customRecipe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "utensil_id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private Utensil utensil;

    @Enumerated(EnumType.STRING)
    @Column(name = "necessity_level", nullable = false, length = 20)
    @Builder.Default
    private NecessityLevel necessityLevel = NecessityLevel.RECOMMENDED;

    @Column(name = "usage_note", length = 200)
    private String usageNote;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}
