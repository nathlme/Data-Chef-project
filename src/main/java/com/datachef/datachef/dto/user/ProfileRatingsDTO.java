package com.datachef.datachef.dto.user;

import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.model.UserRating;
import com.datachef.datachef.model.Users;

public record ProfileRatingsDTO(
        Users user,
        Recipe recipe,
        Short rating,
        String comment
) { public static ProfileRatingsDTO convertToDTO(UserRating userRating){
    return new  ProfileRatingsDTO(userRating.getUser(),userRating.getRecipe(),userRating.getRating(),userRating.getComment());
}
}
