package com.datachef.datachef.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ImageService {

    String uploadImage(UUID recipeId, MultipartFile file);

    String getImageUrl(UUID recipeId);

    void deleteImage(UUID recipeId);
}