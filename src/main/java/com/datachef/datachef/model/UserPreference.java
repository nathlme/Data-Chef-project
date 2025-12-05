package com.datachef.datachef.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@Table(name = "user_preference")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_user_preferences_user"))
    private Users user;

    private String dietType;

    @ManyToMany
    @JoinTable(name = "user_allergen",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "allergen_id")
    )
    private Set<Allergen> allergens = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_cuisine_type", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "cuisine_type_id"))
    private Set<CuisineType> cuisineTypes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_cooking_methods", joinColumns = @JoinColumn(name= "user_id"), inverseJoinColumns = @JoinColumn(name = "cooking_method_id"))
    private Set<CookingMethod>  cookingMethods = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_favorite_ingredient", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private Set<Ingredient> favoriteIngredients = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_disliked_ingredient", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private Set<Ingredient> dislikedIngredients = new HashSet<>();

    //validation will be done in DTO's
    @Column(name = "max_prep_time_minutes")
    private Integer maxPrepTimeMinutes;

    //validation will be done in DTO's
    @Column(name = "max_cook_time_minutes")
    private Integer maxCookTimeMinutes;

    @Column(name = "avoid_gluten")
    private Boolean avoidGluten = false;

    @Column(name = "avoid_lactose")
    private Boolean avoidLactose = false;

    @Column(name = "avoid_pork")
    private Boolean avoidPork = false;

    @Column(name = "avoid_alcohol")
    private Boolean avoidAlcohol = false;




}
