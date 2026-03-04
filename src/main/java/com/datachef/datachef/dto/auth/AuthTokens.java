package com.datachef.datachef.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Paire de tokens JWT retournée après authentification")
public record AuthTokens(

        @Schema(description = "Token d'accès JWT (courte durée de vie)", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String accessToken,

        @Schema(description = "Token de rafraîchissement (longue durée de vie)", example = "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...")
        String refreshToken,

        @Schema(description = "Nom d'utilisateur", example = "john.doe")
        String username,

        @Schema(description = "Rôle de l'utilisateur", example = "ROLE_USER")
        String role

) {}