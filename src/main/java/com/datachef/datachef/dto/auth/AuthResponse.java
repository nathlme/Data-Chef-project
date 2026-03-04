package com.datachef.datachef.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Réponse retournée après une authentification réussie")
public record AuthResponse(

        @Schema(description = "Token d'accès JWT", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String accessToken,

        @Schema(description = "Nom d'utilisateur", example = "john.doe")
        String username,

        @Schema(description = "Rôle de l'utilisateur", example = "ROLE_USER")
        String role

) {}