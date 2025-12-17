package com.datachef.datachef.dto;

public record AuthTokens (

    String accessToken,
    String refreshToken,
    String username,
    String role
    ){}
