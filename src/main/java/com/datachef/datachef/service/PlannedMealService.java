package com.datachef.datachef.service;

import com.datachef.datachef.Enum.MealType;
import com.datachef.datachef.dto.mealplan.DayPlanDTO;
import com.datachef.datachef.dto.mealplan.WeekPlanDTO;
import com.datachef.datachef.model.PlannedMeal;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface PlannedMealService {

    WeekPlanDTO getWeekPlan(UUID userId, LocalDate startDate, LocalDate endDate);

    PlannedMeal assignMeal(UUID userId, LocalDate date, MealType type, UUID recipeId);

    void deleteMeal(UUID mealId);


}
