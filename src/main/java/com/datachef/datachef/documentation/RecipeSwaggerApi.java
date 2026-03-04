package com.datachef.datachef.documentation;

import com.datachef.datachef.Enum.Difficulty;
import com.datachef.datachef.dto.recipe.CreateRecipeDTO;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.recipe.UpdateRecipeDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Tag(name = "Recipes", description = "Gestion des recettes")
public interface RecipeSwaggerApi {

    @Operation(summary = "Récupère une recette par son ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recette trouvée",
                    content = @Content(schema = @Schema(implementation = RecipeDTO.class))),
            @ApiResponse(responseCode = "404", description = "Recette non trouvée", content = @Content)
    })
    ResponseEntity<RecipeDTO> getRecipe(
            @Parameter(description = "UUID de la recette") @PathVariable UUID id
    );

    @Operation(summary = "Crée une nouvelle recette")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recette créée avec succès",
                    content = @Content(schema = @Schema(implementation = RecipeDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content)
    })
    ResponseEntity<RecipeDTO> createRecipe(
            @Parameter(description = "Détails de la recette") @RequestPart("recipe") CreateRecipeDTO recipeDetails,
            @Parameter(description = "Image de la recette (optionnelle)") @RequestPart(value = "image", required = false) MultipartFile file
    );

    @Operation(summary = "Met à jour une recette existante")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recette mise à jour",
                    content = @Content(schema = @Schema(implementation = RecipeDTO.class))),
            @ApiResponse(responseCode = "404", description = "Recette non trouvée", content = @Content),
            @ApiResponse(responseCode = "400", description = "Données invalides", content = @Content)
    })
    ResponseEntity<RecipeDTO> updateRecipe(
            @Parameter(description = "Données de mise à jour") UpdateRecipeDTO recipeDTO,
            @Parameter(description = "UUID de la recette") @PathVariable UUID id,
            @Parameter(description = "Nouvelle image") @RequestPart(value = "image") MultipartFile file
    ) throws IOException;

    @Operation(summary = "Supprime une recette")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Recette supprimée", content = @Content),
            @ApiResponse(responseCode = "404", description = "Recette non trouvée", content = @Content)
    })
    ResponseEntity<Void> deleteRecipe(
            @Parameter(description = "UUID de la recette") @PathVariable UUID id
    );

    @Operation(summary = "Récupère une recette par son nom")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recette trouvée",
                    content = @Content(schema = @Schema(implementation = RecipeDTO.class))),
            @ApiResponse(responseCode = "404", description = "Recette non trouvée", content = @Content)
    })
    ResponseEntity<RecipeDTO> getRecipeFromName(
            @Parameter(description = "Nom de la recette") @PathVariable String name
    );

    @Operation(summary = "Recherche des recettes avec filtres")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Résultats de la recherche",
                    content = @Content(schema = @Schema(implementation = RecipeDTO.class)))
    })
    ResponseEntity<List<RecipeDTO>> search(
            @Parameter(description = "Texte de recherche") @RequestParam(required = false) String query,
            @Parameter(description = "Niveau de difficulté") @RequestParam(required = false) Difficulty difficulty,
            @Parameter(description = "Liste de tags") @RequestParam(required = false) List<String> tags
    );

    @Operation(summary = "Récupère toutes les recettes")
    @ApiResponse(responseCode = "200", description = "Liste de toutes les recettes",
            content = @Content(schema = @Schema(implementation = RecipeDTO.class)))
    ResponseEntity<List<RecipeDTO>> getAllRecipes();
}
