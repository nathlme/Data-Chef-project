package com.datachef.datachef.model;

import com.datachef.datachef.Enum.CookingSkillLevel;
import com.datachef.datachef.Enum.DaysOfTheWeek;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.text.DecimalFormat;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;


@Entity
@Getter
@Setter
@Table(name = "user_preference",
indexes = {
        @Index(name = "idx_user_pref_diet", columnList = "user_diet_type"),
        @Index(name = "idx_user_pref_skill", columnList = "cooking_skill_level"),
        @Index(name = "idx_user_pref_batch", columnList = "batch_cooking_enabled")
})
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "UUID")
    private UUID id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_user_preferences_user"))
    private Users user;

    @ManyToMany
    @JoinTable(name = "user_diet_type", joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "diet_type_id"))
    private Set<DietType> dietTypes = new HashSet<>();

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

    @Column(name ="batch_cooking_enabled")
    private boolean batchCookingEnabled = true;

    @Enumerated(EnumType.STRING)
    private List<DaysOfTheWeek> preferredBatchDays;

    private int BatchPortionTarget = 4;

    private DecimalFormat WeeklyBudgetEuros;

    private boolean PreferSeasonal = false;

    private boolean preferLocal = false;

    private boolean preferOrganic = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooking_skill_level")
    private CookingSkillLevel cookingSkillLevel = CookingSkillLevel.INTERMEDIATE;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;




}
