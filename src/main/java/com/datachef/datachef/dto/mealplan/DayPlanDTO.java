package com.datachef.datachef.dto.mealplan;

import java.time.LocalDate;

public record DayPlanDTO(
        LocalDate date,
        PlannedMealDTO matin,
        PlannedMealDTO midi,
        PlannedMealDTO soir
) {}
