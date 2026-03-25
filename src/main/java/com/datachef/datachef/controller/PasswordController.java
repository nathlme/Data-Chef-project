package com.datachef.datachef.controller;

import com.datachef.datachef.ServiceImpl.PasswordResetService;
import com.datachef.datachef.documentation.PasswordSwaggerApi;
import com.datachef.datachef.dto.auth.ChangePasswordDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
@RequiredArgsConstructor
public class PasswordController implements PasswordSwaggerApi {

    private final PasswordResetService passwordResetService;

    @PostMapping("/forgot")
    public ResponseEntity<Void> forgot(@RequestParam String email) {
        passwordResetService.requestReset(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset")
    public ResponseEntity<Void> reset(@RequestParam String token,
                                      @RequestParam String newPassword) {
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/change")
    public ResponseEntity<Void> change(@RequestBody ChangePasswordDTO dto) {
        passwordResetService.changePassword(dto.userId(), dto.oldPassword(), dto.newPassword());
        return ResponseEntity.ok().build();
    }
}
