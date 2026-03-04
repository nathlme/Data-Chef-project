package com.datachef.datachef.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
@Schema(description = "Données nécessaires pour rafraîchir un token d'accès")
public class RefreshTokenRequest {

    @Schema(description = "Token de rafraîchissement JWT", example = "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...", requiredMode = Schema.RequiredMode.REQUIRED)
    private String refreshToken;

    @Schema(hidden = true)
    private UserDetails userDetails;

}