package com.datachef.datachef.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Schema(description = "Réponse retournée en cas d'erreur")
public class ErrorResponse {

    @Schema(description = "Message décrivant l'erreur", example = "Identifiants invalides")
    private String message;

}