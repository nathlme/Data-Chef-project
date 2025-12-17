package com.datachef.datachef.dto;

public record AuthResponse(
        String accessToken,
        String username,
        String role
) {}
