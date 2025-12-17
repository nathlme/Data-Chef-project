package com.datachef.datachef.exception;

public class InvalidRefreshTokenException extends RuntimeException {
    public InvalidRefreshTokenException() {
        super("RefreshToken not found");
    }
}
