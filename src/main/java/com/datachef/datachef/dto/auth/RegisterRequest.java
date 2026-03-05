package com.datachef.datachef.dto.auth;

import com.datachef.datachef.validator.ValidPassword;
import com.datachef.datachef.validator.ValidRegisterRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@ValidRegisterRequest
@Schema(description = "Données nécessaires pour créer un nouveau compte")
public class RegisterRequest {

    @Schema(description = "Nom d'utilisateur unique", example = "john.doe", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank
    private String username;

    @Schema(description = "Mot de passe (min. 8 caractères), chiffre et lettre", example = "p@ssw0rd", requiredMode = Schema.RequiredMode.REQUIRED)
    @ValidPassword
    private String password;

    @Schema(description = "Adresse e-mail", example = "john.doe@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
    @Email
    @NotBlank
    private String email;

}