package com.datachef.datachef.service;

import com.datachef.datachef.dto.user.ProfileDTO;
import com.datachef.datachef.model.Users;

import java.util.UUID;

public interface UserService {

    Users getUserByUUID(UUID uuid);
    ProfileDTO getMyProfileByUsername(String username);
}
