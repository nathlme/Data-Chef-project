package com.datachef.datachef.model;

import com.datachef.datachef.Enum.NecessityLevel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "recipe_utensils",
        indexes = {
                @Index(name = "idx_recipe_utensils_recipe", columnList = "recipe_id"),
                @Index(name = "idx_recipe_utensils_utensil", columnList = "utensil_id"),
                @Index(name = "idx_recipe_utensils_necessity", columnList = "necessity_level")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "unique_recipe_utensil",
                        columnNames = {"recipe_id", "utensil_id"}
                )
        }
)
@Getter
@Setter
public class RecipeUtensil {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipe_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "utensil_id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private Utensil utensil;

    @Enumerated(EnumType.STRING)
    @Column(name = "necessity_level", nullable = false, length = 20)
    private NecessityLevel necessityLevel = NecessityLevel.RECOMMENDED;

    @Column(name = "usage_note", length = 200)
    private String usageNote;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

}
