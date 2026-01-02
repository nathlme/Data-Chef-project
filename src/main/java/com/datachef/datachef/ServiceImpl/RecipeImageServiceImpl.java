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
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;


@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@Transactional
public class RecipeImageServiceImpl implements ImageService {

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

        String imageKey = buildImageKey(recipeId, file.getOriginalFilename());
        
        try{
            imageStockageService.upload(
                    bucket,
                    imageKey,
                    file.getInputStream(),
                    file.getSize(),
                    file.getContentType()
            );
        }catch (Exception e){
            throw new RuntimeException("Recipe image upload failed");
        }

        recipe.setImageKey(imageKey);
        return imageKey;
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
