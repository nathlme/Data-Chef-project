package com.datachef.datachef.service;


import com.datachef.datachef.dto.AuthTokens;
import com.datachef.datachef.dto.LoginRequest;
import com.datachef.datachef.dto.RegisterRequest;
import com.datachef.datachef.model.RefreshToken;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthTokens register(RegisterRequest request) {
        System.out.println("Register attempt for username: " + request.getUsername());

        if (usersRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (usersRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Users user = new Users();
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole("USER");
        user.setIs_active(true);

        user = usersRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());
        RefreshToken refreshToken = refreshService.createRefreshToken(user);
        String rt = refreshToken.getToken();


        return new AuthTokens(token,rt, user.getUsername(), user.getRole());
    }

    public AuthTokens login(LoginRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (AuthenticationException e) {

            throw new RuntimeException("Invalid credentials");
        }

        Users user = usersRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getIs_active()) {
            throw new RuntimeException("User account is inactive");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        RefreshToken refreshToken = refreshService.createRefreshToken(user);
        String rt = refreshToken.getToken();
        System.out.println("Login successful, token generated");

        return new AuthTokens(token,rt, user.getUsername(), user.getRole());
    }

    public AuthTokens refreshToken(String refreshTokenValue) {

        RefreshToken oldToken = refreshService.validate(refreshTokenValue);

        Users user = oldToken.getUser();

        refreshService.revoke(oldToken);

        RefreshToken rt = refreshService.createRefreshToken(user);

        String accessToken = jwtUtil.generateToken(user.getUsername());

        return new AuthTokens(accessToken,rt.getToken(),user.getUsername(), user.getRole());

    }


}