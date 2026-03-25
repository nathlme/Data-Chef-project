package com.datachef.datachef.service;

import com.datachef.datachef.dto.user.ProfileDTO;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.UUID;


public interface UserService {

    ProfileDTO getMyProfileByUsername(String username);
    ProfileDTO updateProfile(ProfileDTO profileDTO, MultipartFile file) throws IOException;
    void deleteUser(UUID id);
    List<ProfileDTO> searchUser(String query);
}
