package com.datachef.datachef.model;


import com.datachef.datachef.Enum.NecessityLevel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(
        name = "utensils",
        indexes = {
                @Index(name = "idx_utensils_category", columnList = "category"),
                @Index(name = "idx_utensils_necessity", columnList = "necessity_level")
        }
)
public class Ustensil {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private NecessityLevel necessityLevel;

    private boolean isActive = true;

    private String imageUrl;

    @OneToMany(mappedBy = "utensil")
    private List<RecipeUstensil> recipeUtensils = new ArrayList<>();
}
