package com.datachef.datachef.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Données nécessaires pour créer un nouveau compte")
public class RegisterRequest {

    @Schema(description = "Nom d'utilisateur unique", example = "john.doe", requiredMode = Schema.RequiredMode.REQUIRED)
    private String username;

    @Schema(description = "Mot de passe (min. 8 caractères recommandé)", example = "p@ssw0rd", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    @Schema(description = "Adresse e-mail", example = "john.doe@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

}