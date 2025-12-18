package com.datachef.datachef.dto.auth;

public record AuthResponse(
        String accessToken,
        String username,
        String role
) {}
