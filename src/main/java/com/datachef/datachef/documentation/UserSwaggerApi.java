package com.datachef.datachef.documentation;

import com.datachef.datachef.dto.user.ProfileDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Tag(name = "User", description = "Gestion des profils utilisateurs")
public interface UserSwaggerApi {

    @Operation(
            summary = "Récupérer un profil par nom d'utilisateur",
            description = "Retourne les informations publiques du profil correspondant au nom d'utilisateur fourni.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profil trouvé",
                    content = @Content(schema = @Schema(implementation = ProfileDTO.class))),
            @ApiResponse(responseCode = "404", description = "Utilisateur introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"User not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<ProfileDTO> getMyAccountByUsername(
            @Parameter(description = "Nom d'utilisateur", required = true, example = "johndoe")
            @PathVariable String username
    );

    @Operation(
            summary = "Mettre à jour le profil",
            description = "Met à jour les informations du profil (email, username) et optionnellement la photo de profil. " +
                    "La mise à jour de l'image n'est déclenchée que si le hash du fichier envoyé diffère de celui stocké.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profil mis à jour avec succès",
                    content = @Content(schema = @Schema(implementation = ProfileDTO.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides ou email/username déjà utilisé",
                    content = @Content(schema = @Schema(example = "{\"message\": \"Username already exists\"}"))),
            @ApiResponse(responseCode = "404", description = "Utilisateur introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"User not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur lors de l'upload de l'image",
                    content = @Content(schema = @Schema(example = "{\"message\": \"user image upload failed\"}")))
    })
    ResponseEntity<ProfileDTO> updateProfile(
            @Parameter(description = "Données du profil à mettre à jour", required = true)
            @RequestBody ProfileDTO profileDTO,
            @Parameter(description = "Nouvelle photo de profil (optionnelle)", required = false)
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws IOException;

    @Operation(
            summary = "Supprimer un compte utilisateur",
            description = "Supprime définitivement le compte utilisateur ainsi que son image de profil associée.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Compte supprimé avec succès", content = @Content),
            @ApiResponse(responseCode = "404", description = "Utilisateur introuvable",
                    content = @Content(schema = @Schema(example = "{\"message\": \"User not found\"}"))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<?> deleteProfile(
            @Parameter(description = "UUID de l'utilisateur à supprimer", required = true,
                    example = "123e4567-e89b-12d3-a456-426614174000")
            @PathVariable UUID id
    );

    @Operation(
            summary = "Rechercher des utilisateurs",
            description = "Retourne la liste des utilisateurs dont le nom d'utilisateur contient la chaîne de recherche (insensible à la casse). " +
                    "Retourne une liste vide si aucun résultat ne correspond.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Liste des utilisateurs correspondants (peut être vide)",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ProfileDTO.class)))),
            @ApiResponse(responseCode = "500", description = "Erreur serveur inattendue",
                    content = @Content(schema = @Schema(example = "{\"message\": \"An error occurred\"}")))
    })
    ResponseEntity<List<ProfileDTO>> searchUser(
            @Parameter(description = "Chaîne de recherche sur le nom d'utilisateur", required = true, example = "john")
            @RequestParam String query
    );
}