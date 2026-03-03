package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.model.Recipe;
import com.datachef.datachef.repository.RecipeRepository;
import com.datachef.datachef.service.ImageService;
import com.datachef.datachef.service.ImageStockageService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.UUID;


@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Transactional
public class RecipeImageService implements ImageService {

    private final RecipeRepository recipeRepository;
    private final ImageStockageService imageStockageService;
    private static final int EXPIRY = 3600;

    @Value("${MINIO_BUCKET}")
    private String bucket;

    @Override
    public String uploadImage(UUID recipeId, MultipartFile file) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        if(recipe.getImageKey() != null){
            imageStockageService.delete(bucket, recipe.getImageKey());
        }

        try {
            byte[] fileBytes = file.getBytes();
            String imageKey = buildImageKey(recipeId, file.getOriginalFilename());

            imageStockageService.upload(
                    bucket,
                    imageKey,
                    new ByteArrayInputStream(fileBytes),
                    fileBytes.length,
                    file.getContentType()
            );

            recipe.setImageKey(imageKey);
            recipe.setImageHash(DigestUtils.md5DigestAsHex(fileBytes));
            return imageKey;

        }catch (Exception e){
            throw new RuntimeException("Recipe image upload failed",e);
        }


    }


    @Override
    public String getImageUrl(UUID recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        if (recipe.getImageKey() == null) {
            return null;
        }

        return imageStockageService.generateReadUrl(
                bucket,
                recipe.getImageKey(),
                EXPIRY
        );
    }

    @Override
    public void deleteImage(UUID recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found"));

        if (recipe.getImageKey() != null) {
            imageStockageService.delete(bucket, recipe.getImageKey());
            recipe.setImageKey(null);
        }
    }


    private String buildImageKey(UUID Id, String filename) {
        String ext = filename.substring(filename.lastIndexOf("."));
        return "recipe/%s/%s%s".formatted(
                Id,
                UUID.randomUUID(),
                ext
        );
    }
}
