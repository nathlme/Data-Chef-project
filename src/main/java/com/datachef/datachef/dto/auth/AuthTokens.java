package com.datachef.datachef.dto.auth;

public record AuthTokens (

    String accessToken,
    String refreshToken,
    String username,
    String role
    ){}
