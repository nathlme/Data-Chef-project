package com.datachef.datachef.dto.user;

import com.datachef.datachef.model.Users;

import java.util.ArrayList;
import java.util.List;

public record ProfileDTO(
        String username,
        String email,
        String imagekey,
        List<ProfileRatingsDTO> ratings

) { public static ProfileDTO convertToDTO(Users user){
    return new  ProfileDTO(
            user.getUsername(),
            user.getEmail(),
            user.getImagekey(),
            user.getRatings() == null ? null : user.getRatings().stream().map(ProfileRatingsDTO::convertToDTO).toList()
    );
}
}
