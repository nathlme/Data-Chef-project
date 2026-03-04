package com.datachef.datachef.documentation;

import com.datachef.datachef.dto.auth.LoginRequest;
import com.datachef.datachef.dto.auth.RegisterRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.datachef.datachef.model.Users;

@Tag(name = "Auth", description = "Gestion de l'authentification et des sessions")
public interface AuthSwaggerApi {

    @Operation(summary = "Créer un compte utilisateur")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Inscription réussie — retourne l'access token JWT dans le body, le refresh token est posé en cookie HttpOnly",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Email déjà utilisé ou données invalides",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Email already in use\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<?> register(
            @Parameter(description = "Informations d'inscription") @RequestBody RegisterRequest request
    );

    @Operation(summary = "Authentifier un utilisateur")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Connexion réussie — retourne l'access token JWT dans le body, le refresh token est posé en cookie HttpOnly",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "401", description = "Identifiants incorrects",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Bad credentials\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<?> login(
            @Parameter(description = "Identifiants de connexion") @RequestBody LoginRequest request
    );

    @Operation(
            summary = "Renouveler l'access token",
            description = "Utilise le cookie HttpOnly `refreshToken` pour émettre un nouveau couple access/refresh token (rotation). " +
                    "Si le cookie est absent, expiré ou invalide, la session est invalidée et le cookie est supprimé."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Nouveau access token retourné dans le body, refresh token renouvelé en cookie",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "401", description = "Cookie absent, refresh token expiré ou invalide — cookie supprimé", content = @Content)
    })
    ResponseEntity<?> refreshToken(
            @Parameter(description = "Refresh token lu depuis le cookie HttpOnly (envoyé automatiquement par le navigateur)")
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    );

    @Operation(
            summary = "Déconnexion de l'appareil courant",
            description = "Révoque le refresh token de la session courante et supprime le cookie. L'access token reste valide jusqu'à son expiration."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Déconnexion réussie — cookie supprimé",
                    content = @Content(schema = @Schema(example = "\"Logged out from this device\""))),
            @ApiResponse(responseCode = "400", description = "Erreur lors de la révocation du token", content = @Content)
    })
    ResponseEntity<?> logout(
            @Parameter(description = "Refresh token lu depuis le cookie HttpOnly")
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    );

    @Operation(
            summary = "Déconnexion de tous les appareils",
            description = "Révoque l'ensemble des refresh tokens liés au compte. Nécessite un access token valide.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Toutes les sessions révoquées — cookie supprimé",
                    content = @Content(schema = @Schema(example = "\"Logged out from all devices\""))),
            @ApiResponse(responseCode = "400", description = "Erreur lors de la révocation globale", content = @Content)
    })
    ResponseEntity<?> logoutFromAll(
            @Parameter(hidden = true) @AuthenticationPrincipal Users user
    );
}