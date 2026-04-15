package com.datachef.datachef.repository;

import com.datachef.datachef.Enum.MealType;
import com.datachef.datachef.model.PlannedMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlannedMealRepository extends JpaRepository<PlannedMeal, UUID> {

    List<PlannedMeal> findByUserIdAndMealDateBetweenOrderByMealDateAscMealTypeAsc(
            UUID userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Pour ajouter/remplacer un repas sur un créneau précis
    Optional<PlannedMeal> findByUserIdAndMealDateAndMealType(
            UUID userId,
            LocalDate mealDate,
            MealType mealType
    );
}
