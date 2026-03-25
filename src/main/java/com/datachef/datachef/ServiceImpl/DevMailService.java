package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DevMailService implements MailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Réinitialisation de mot de passe");
        message.setText("Clique sur ce lien pour réinitialiser ton mot de passe : "
                + "https://ton-app.com/reset-password?token=" + token);
        mailSender.send(message);
    }
}
