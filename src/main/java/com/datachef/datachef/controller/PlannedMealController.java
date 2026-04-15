package com.datachef.datachef.controller;

import com.datachef.datachef.Enum.MealType;
import com.datachef.datachef.dto.mealplan.WeekPlanDTO;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.service.PlannedMealService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.UUID;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;

@RestController
@RequestMapping("/api/meals")
public class PlannedMealController {

    private final PlannedMealService plannedMealService;
    private final UserRepository usersRepository;

    public PlannedMealController(PlannedMealService plannedMealService,UserRepository usersRepository) {
        this.plannedMealService = plannedMealService;
        this.usersRepository = usersRepository;
    }

    @GetMapping("/week")
    public ResponseEntity<WeekPlanDTO> getWeek(
            @RequestParam(required = false) @DateTimeFormat(iso = DATE) LocalDate start,
            @RequestParam(required = false) @DateTimeFormat(iso = DATE) LocalDate end,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        LocalDate startDate = start != null ? start : LocalDate.now().with(DayOfWeek.MONDAY);
        LocalDate endDate   = end   != null ? end   : startDate.plusDays(6);

        Users user = usersRepository.findByUsername(userDetails.getUsername()).orElseThrow(()-> new EntityNotFound(Users.class));
        return ResponseEntity.ok(plannedMealService.getWeekPlan(user.getId(), startDate, endDate));
    }

    @PutMapping("/{date}/{mealType}")
    public ResponseEntity<Void> assign(
            @PathVariable @DateTimeFormat(iso = DATE) LocalDate date,
            @PathVariable MealType mealType,
            @RequestBody UUID recipeId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Users user = usersRepository.findByUsername(userDetails.getUsername()).orElseThrow(()-> new EntityNotFound(Users.class));
        plannedMealService.assignMeal(user.getId(), date, mealType, recipeId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        plannedMealService.deleteMeal(id);
        return ResponseEntity.noContent().build();
    }
}
