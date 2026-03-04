package com.datachef.datachef.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Données nécessaires pour se connecter")
public class LoginRequest {

    @Schema(description = "Nom d'utilisateur", example = "john.doe", requiredMode = Schema.RequiredMode.REQUIRED)
    private String username;

    @Schema(description = "Mot de passe", example = "p@ssw0rd", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

}