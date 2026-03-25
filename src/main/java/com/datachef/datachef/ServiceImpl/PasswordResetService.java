package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.PasswordResetToken;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.PasswordResetTokenRepository;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.service.MailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;


    public void requestReset(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFound(Users.class));


        tokenRepository.deleteByUser(user);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(UUID.randomUUID().toString());
        resetToken.setUser(user);
        resetToken.setExpiresAt(OffsetDateTime.now().plusMinutes(15));
        tokenRepository.save(resetToken);

        mailService.sendResetEmail(user.getEmail(), resetToken.getToken());
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token invalide"));

        if (resetToken.isUsed()) {
            throw new RuntimeException("Token déjà utilisé");
        }
        if (resetToken.getExpiresAt().isBefore(OffsetDateTime.now())) {
            throw new RuntimeException("Token expiré");
        }

        Users user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
    }

    public void changePassword(UUID userId, String oldPassword, String newPassword) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFound(Users.class));

        if (!passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
