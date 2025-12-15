package com.datachef.datachef.service;

import com.datachef.datachef.dto.AuthResponse;
import com.datachef.datachef.dto.LoginRequest;
import com.datachef.datachef.dto.RegisterRequest;
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
    private AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
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

        System.out.println("Saving user...");
        user = usersRepository.save(user);
        System.out.println("User saved with ID: " + user.getId());

        String token = jwtUtil.generateToken(user.getUsername());
        System.out.println("Token generated");

        return new AuthResponse(token, user.getUsername(), user.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        System.out.println("Login attempt for username: " + request.getUsername());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (AuthenticationException e) {
            System.err.println("Authentication failed: " + e.getMessage());
            throw new RuntimeException("Invalid credentials");
        }

        Users user = usersRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getIs_active()) {
            throw new RuntimeException("User account is inactive");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        System.out.println("Login successful, token generated");

        return new AuthResponse(token, user.getUsername(), user.getRole());
    }
}