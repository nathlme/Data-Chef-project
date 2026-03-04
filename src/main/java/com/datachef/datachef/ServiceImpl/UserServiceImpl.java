package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.user.ProfileDTO;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.UserRepository;
import com.datachef.datachef.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    final UserRepository userRepository;

    @Override
    public Users getUserByUUID(UUID id){
       return userRepository.findById(id).orElseThrow(() -> new EntityNotFound(Users.class));
    }

    @Override
    public ProfileDTO getMyProfileByUsername(String username) {
        Users user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFound(Users.class));
        return ProfileDTO.convertToDTO(user);
    }

}
