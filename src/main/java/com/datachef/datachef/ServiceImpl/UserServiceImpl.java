package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.image.ImageUploadResult;
import com.datachef.datachef.dto.user.ProfileDTO;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.service.ImageService;
import com.datachef.datachef.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Qualifier("userImageService")
    private final ImageService imageService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Qualifier("userImageService") ImageService imageService) {
        this.userRepository = userRepository;
        this.imageService = imageService;
    }

    @Override
    public ProfileDTO getMyProfileByUsername(String username) {
        Users user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFound(Users.class));
        return ProfileDTO.convertToDTO(user);
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO, MultipartFile file) throws IOException {

            Users user = userRepository.findById(profileDTO.id()).orElseThrow(() -> new EntityNotFound(Users.class));
            user.setEmail(profileDTO.email());
            user.setUsername(profileDTO.username());

        if (file != null && !file.isEmpty()) {
            byte[] fileBytes = file.getBytes();
            String newHash = DigestUtils.md5DigestAsHex(fileBytes);
            if (!newHash.equals(user.getImageHash())) {
                ImageUploadResult uploadResult = imageService.uploadImage(user.getId(), file);
                user.setImageHash(uploadResult.imageHash());
                user.setImagekey(uploadResult.imageKey());
            }
        }


            userRepository.save(user);

            return ProfileDTO.convertToDTO(user);

    }

    @Override
    public void deleteUser(UUID id) {
        Users userToDelete = userRepository.findById(id).orElseThrow(() -> new EntityNotFound(Users.class));
        userRepository.delete(userToDelete);

    }

    @Override
    public List<ProfileDTO> searchUser(String query){
        List<Users> users = userRepository.findByUsernameContainingIgnoreCase(query);
        return users.stream().map(ProfileDTO::convertToDTO).toList();
    }

}
