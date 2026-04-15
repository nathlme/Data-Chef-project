package com.datachef.datachef.documentation;

import com.datachef.datachef.Enum.MealType;
import com.datachef.datachef.dto.mealplan.WeekPlanDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE;

@Tag(name = "Meal Planner", description = "Gestion des repas planifiés")
public interface PlannedMealSwaggerApi {

    @Operation(
            summary = "Récupérer le plan de la semaine",
            description = "Retourne les repas planifiés pour une période donnée. " +
                    "Par défaut, retourne la semaine courante (lundi au dimanche).",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Plan de la semaine récupéré avec succès",
                    content = @Content(schema = @Schema(implementation = WeekPlanDTO.class))),
            @ApiResponse(responseCode = "401", description = "Non authentifié",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Unauthorized\"}"))),
            @ApiResponse(responseCode = "404", description = "Utilisateur introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"User not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<WeekPlanDTO> getWeek(
            @Parameter(description = "Date de début (ISO 8601). Défaut : lundi de la semaine courante.", example = "2025-01-06")
            @RequestParam(required = false) @DateTimeFormat(iso = DATE) LocalDate start,

            @Parameter(description = "Date de fin (ISO 8601). Défaut : start + 6 jours.", example = "2025-01-12")
            @RequestParam(required = false) @DateTimeFormat(iso = DATE) LocalDate end,

            @Parameter(hidden = true)
            @AuthenticationPrincipal UserDetails userDetails
    );

    @Operation(
            summary = "Assigner une recette à un repas",
            description = "Associe une recette (identifiée par son UUID) à un type de repas pour une date donnée. " +
                    "Si un repas existe déjà pour ce créneau, il est remplacé.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Repas assigné avec succès", content = @Content),
            @ApiResponse(responseCode = "400", description = "Paramètres invalides",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Invalid mealType\"}"))),
            @ApiResponse(responseCode = "401", description = "Non authentifié",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Unauthorized\"}"))),
            @ApiResponse(responseCode = "404", description = "Utilisateur ou recette introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Recipe not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<Void> assign(
            @Parameter(description = "Date du repas (ISO 8601)", required = true, example = "2025-01-07")
            @PathVariable @DateTimeFormat(iso = DATE) LocalDate date,

            @Parameter(description = "Type de repas (ex: BREAKFAST, LUNCH, DINNER)", required = true, example = "LUNCH")
            @PathVariable MealType mealType,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "UUID de la recette à assigner",
                    required = true,
                    content = @Content(schema = @Schema(type = "string", format = "uuid", example = "123e4567-e89b-12d3-a456-426614174000"))
            )
            @RequestBody UUID recipeId,

            @Parameter(hidden = true)
            @AuthenticationPrincipal UserDetails userDetails
    );

    @Operation(
            summary = "Supprimer un repas planifié",
            description = "Supprime définitivement un repas planifié identifié par son UUID.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Repas supprimé avec succès", content = @Content),
            @ApiResponse(responseCode = "404", description = "Repas introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Planned meal not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "UUID du repas planifié à supprimer", required = true,
                    example = "123e4567-e89b-12d3-a456-426614174000")
            @PathVariable UUID id
    );
}