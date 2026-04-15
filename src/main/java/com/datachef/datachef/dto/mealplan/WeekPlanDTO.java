package com.datachef.datachef.dto.mealplan;

import java.time.LocalDate;
import java.util.Map;

public record WeekPlanDTO(
        Map<LocalDate, DayPlanDTO> days
) {}
