package com.datachef.datachef.service;

import com.datachef.datachef.exception.ExpiredRefreshTokenException;
import com.datachef.datachef.exception.InvalidRefreshTokenException;
import com.datachef.datachef.model.RefreshToken;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Component
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private static final Duration REFRESH_TOKEN_TTL = Duration.ofDays(7);


    public RefreshToken createRefreshToken(Users user){
        RefreshToken rt = new RefreshToken();

        rt.setToken(UUID.randomUUID().toString());
        rt.setUser(user);
        rt.setExpiryDate(Instant.now().plus(REFRESH_TOKEN_TTL));
        rt.setRevoked(false);
        return refreshTokenRepository.save(rt);
    }

    public RefreshToken validate(String token){
        RefreshToken rt = refreshTokenRepository.findByTokenAndRevokedFalse(token).orElseThrow(InvalidRefreshTokenException::new);

        if(rt.getExpiryDate().isBefore(Instant.now())){
            rt.setRevoked(true);
            refreshTokenRepository.save(rt);
            throw new ExpiredRefreshTokenException();
        }

        return rt;
    }

    public void revoke(RefreshToken token) {
        token.setRevoked(true);
        refreshTokenRepository.save(token);
    }

    public void revokeForAll(Users user){
        List<RefreshToken> refreshTokenList = refreshTokenRepository.findByUserAndRevokedFalse(user);
        for(RefreshToken refreshToken : refreshTokenList){
            revoke(refreshToken);
        }
    }

}
