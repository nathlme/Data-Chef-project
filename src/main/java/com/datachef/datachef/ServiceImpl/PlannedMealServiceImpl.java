package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.Enum.MealType;
import com.datachef.datachef.dto.mealplan.DayPlanDTO;
import com.datachef.datachef.dto.mealplan.PlannedMealDTO;
import com.datachef.datachef.dto.mealplan.WeekPlanDTO;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.PlannedMeal;
import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.PlannedMealRepository;
import com.datachef.datachef.repository.RecipeRepository;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.service.PlannedMealService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PlannedMealServiceImpl implements PlannedMealService {

    private final PlannedMealRepository repository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public PlannedMealServiceImpl(PlannedMealRepository repository,  UserRepository userRepository, RecipeRepository recipeRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    @Override
    public WeekPlanDTO getWeekPlan(UUID userId, LocalDate startDate, LocalDate endDate) {
        List<PlannedMeal> meals = repository
                .findByUserIdAndMealDateBetweenOrderByMealDateAscMealTypeAsc(
                        userId, startDate, endDate
                );

        Map<LocalDate, List<PlannedMeal>> byDate = meals.stream()
                .collect(Collectors.groupingBy(PlannedMeal::getMealDate));

        Map<LocalDate, DayPlanDTO> days = new LinkedHashMap<>();
        startDate.datesUntil(endDate.plusDays(1)).forEach(date -> {
            List<PlannedMeal> dayMeals = byDate.getOrDefault(date, List.of());
            days.put(date, toDayPlanDTO(date, dayMeals));
        });

        return new WeekPlanDTO(days);
    }

    private DayPlanDTO toDayPlanDTO(LocalDate date, List<PlannedMeal> meals) {
        Map<MealType, PlannedMeal> byType = meals.stream()
                .collect(Collectors.toMap(PlannedMeal::getMealType, m -> m));

        return new DayPlanDTO(
                date,
                toDTO(byType.get(MealType.BREAKFAST)),
                toDTO(byType.get(MealType.LUNCH)),
                toDTO(byType.get(MealType.DINNER))
        );
    }

    private PlannedMealDTO toDTO(PlannedMeal meal) {
        if (meal == null) return null;

        String name = meal.getRecipe() != null
                ? meal.getRecipe().getName()
                : meal.getCustomRecipe().getName();

        String imageUrl = meal.getRecipe() != null
                ? meal.getRecipe().getImageKey()
                : null;

        return new PlannedMealDTO(
                meal.getId(), name, imageUrl,
                meal.getMealType(), meal.getServings(), meal.getStatus()
        );
    }

    @Override
    public PlannedMeal assignMeal(UUID userId, LocalDate date, MealType type, UUID recipeId) {
        repository.findByUserIdAndMealDateAndMealType(userId, date, type)
                .ifPresent(repository::delete);

        Users user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFound(Users.class));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new EntityNotFound(Recipe.class));


        PlannedMeal planned = PlannedMeal.builder()
                .mealDate(date)
                .mealType(type)
                .recipe(recipe)
                .user(user)
                .build();
        return repository.save(planned);
    }

    @Override
    public void deleteMeal(UUID mealId) {
        PlannedMeal meal = repository.findById(mealId)
                .orElseThrow(() -> new EntityNotFound(PlannedMeal.class));
        repository.delete(meal);
    }
}
