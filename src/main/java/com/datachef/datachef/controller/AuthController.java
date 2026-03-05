package com.datachef.datachef.controller;

import com.datachef.datachef.config.RefreshCookieConfig;
import com.datachef.datachef.documentation.AuthSwaggerApi;
import com.datachef.datachef.dto.auth.AuthTokens;
import com.datachef.datachef.dto.auth.LoginRequest;
import com.datachef.datachef.dto.auth.RegisterRequest;
import com.datachef.datachef.exception.ExpiredRefreshTokenException;
import com.datachef.datachef.exception.InvalidRefreshTokenException;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.security.JwtUtil;
import com.datachef.datachef.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController implements AuthSwaggerApi {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshCookieConfig cookieConfig;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {

            AuthTokens response = authService.register(request);
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,
                            cookieConfig.refreshCookie(response.refreshToken()))
                    .body(response.accessToken());

        } catch (RuntimeException e) {

            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

        } catch (Exception e) {

            Map<String, String> error = new HashMap<>();
            error.put("message", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {

            AuthTokens response = authService.login(request);
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,
                            cookieConfig.refreshCookie(response.refreshToken()))
                    .body(response.accessToken());
        } catch (RuntimeException e) {

            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {

        if(refreshToken == null){
            return logoutResponse();
        }

        try{
            AuthTokens response = authService.refreshToken(refreshToken);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,
                            cookieConfig.refreshCookie(response.refreshToken()))
                    .body(response.accessToken());

        }catch(ExpiredRefreshTokenException | InvalidRefreshTokenException e){

            return logoutResponse();
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        try {

            authService.logout(refreshToken);

        }catch(Exception e){

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookieConfig.deleteRefreshCookie())
                .body("Logged out from this device");

    }

    @PostMapping("/logout/all")
    public ResponseEntity<?> logoutFromAll(@AuthenticationPrincipal Users user){
        try{
            authService.logoutFromAll(user);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookieConfig.deleteRefreshCookie())
                .body("Logged out from all devices");
    }



    private ResponseEntity<?> logoutResponse() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .header(HttpHeaders.SET_COOKIE, cookieConfig.deleteRefreshCookie())
                .build();
    }
}


