package com.datachef.datachef.controller;


import com.datachef.datachef.documentation.UserSwaggerApi;
import com.datachef.datachef.dto.recipe.RecipeDTO;
import com.datachef.datachef.dto.user.ProfileDTO;
import com.datachef.datachef.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/user")
public class UserController implements UserSwaggerApi {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<ProfileDTO> getAccountByUsername(@PathVariable String username) {
            return ResponseEntity.ok().body(userService.getMyProfileByUsername(username));
    }

    @PatchMapping(path ="/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO, @RequestPart(value = "image") MultipartFile file) throws IOException {
        return ResponseEntity.ok().body(userService.updateProfile(profileDTO, file));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProfile(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProfileDTO>> searchUser(@RequestParam String query) {
        return ResponseEntity.ok(userService.searchUser(query));
    }


}
