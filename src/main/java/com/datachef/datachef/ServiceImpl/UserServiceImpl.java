package com.datachef.datachef.ServiceImpl;

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
       return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
    }

}
