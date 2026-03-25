package com.datachef.datachef.service;

public interface MailService {

    void sendResetEmail(String to, String token);
}
