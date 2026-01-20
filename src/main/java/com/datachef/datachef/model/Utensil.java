package com.datachef.datachef.model;


import com.datachef.datachef.Enum.NecessityLevel;
import com.datachef.datachef.Enum.UtensilCategory;
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
        name = "utensils"
)
public class Utensil {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private UtensilCategory category;

    @Enumerated(EnumType.STRING)
    private NecessityLevel necessityLevel;

    private boolean isActive = true;

    private String imageKey;

    @OneToMany(mappedBy = "utensil")
    private List<RecipeUtensil> recipeUtensils = new ArrayList<>();
}
