package com.datachef.datachef.controller;


import com.datachef.datachef.dto.user.ProfileDTO;
import com.datachef.datachef.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<ProfileDTO> getMyAccountByUsername(String username) {
            return ResponseEntity.ok().body(userService.getMyProfileByUsername(username));
    }
}
