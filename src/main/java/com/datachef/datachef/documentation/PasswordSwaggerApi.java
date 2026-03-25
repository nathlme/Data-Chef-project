package com.datachef.datachef.documentation;

import com.datachef.datachef.dto.auth.ChangePasswordDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Password", description = "Gestion de la réinitialisation et du changement de mot de passe")
public interface PasswordSwaggerApi {

    @Operation(
            summary = "Demander une réinitialisation de mot de passe",
            description = "Envoie un email contenant un lien de réinitialisation valable 15 minutes. " +
                    "Retourne toujours 200 même si l'email n'existe pas, afin d'éviter l'énumération des comptes."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Email envoyé si le compte existe", content = @Content),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<Void> forgot(
            @Parameter(description = "Adresse email du compte à réinitialiser", required = true, example = "johndoe@example.com")
            @RequestParam String email
    );

    @Operation(
            summary = "Réinitialiser le mot de passe",
            description = "Valide le token de réinitialisation et met à jour le mot de passe. " +
                    "Le token est à usage unique et expire après 15 minutes."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Mot de passe réinitialisé avec succès", content = @Content),
            @ApiResponse(responseCode = "400", description = "Token invalide, déjà utilisé ou expiré",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Token expiré\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<Void> reset(
            @Parameter(description = "Token de réinitialisation reçu par email", required = true,
                    example = "550e8400-e29b-41d4-a716-446655440000")
            @RequestParam String token,
            @Parameter(description = "Nouveau mot de passe", required = true, example = "NewP@ssw0rd!")
            @RequestParam String newPassword
    );

    @Operation(
            summary = "Changer le mot de passe (utilisateur connecté)",
            description = "Permet à un utilisateur authentifié de changer son mot de passe en fournissant l'ancien. " +
                    "Nécessite un access token valide.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Mot de passe changé avec succès", content = @Content),
            @ApiResponse(responseCode = "400", description = "Ancien mot de passe incorrect",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Ancien mot de passe incorrect\"}"))),
            @ApiResponse(responseCode = "404", description = "Utilisateur introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"User not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<Void> change(
            @Parameter(description = "Ancien mot de passe, nouveau mot de passe et UUID de l'utilisateur", required = true)
            @RequestBody ChangePasswordDTO dto
    );
}