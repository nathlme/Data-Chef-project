package com.datachef.datachef.dto.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
public class RefreshTokenRequest {

    private String refreshToken;

    private UserDetails userDetails;
}
