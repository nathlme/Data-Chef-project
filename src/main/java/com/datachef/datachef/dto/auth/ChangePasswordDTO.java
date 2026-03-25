package com.datachef.datachef.dto.auth;

import java.util.UUID;

public record ChangePasswordDTO(
        UUID userId,
        String oldPassword,
        String newPassword
) {
}
