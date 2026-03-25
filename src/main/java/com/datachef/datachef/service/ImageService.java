package com.datachef.datachef.service;

import com.datachef.datachef.dto.image.ImageUploadResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ImageService {

    ImageUploadResult uploadImage(UUID recipeId, MultipartFile file);

    String getImageUrl(UUID recipeId);

    void deleteImage(UUID recipeId);
}