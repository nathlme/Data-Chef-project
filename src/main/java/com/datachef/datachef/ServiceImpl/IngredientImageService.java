package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.image.ImageUploadResult;
import com.datachef.datachef.exception.EntityNotFound;
import com.datachef.datachef.model.Ingredient;
import com.datachef.datachef.repository.IngredientRepository;
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
import java.util.Objects;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class IngredientImageService implements ImageService {

    private final IngredientRepository ingredientRepository;
    private final ImageStockageService imageStockageService;
    private static final int EXPIRY = 3600;

    @Value("${MINIO_BUCKET}")
    private String bucket;

    @Override
    public ImageUploadResult uploadImage(UUID Id, MultipartFile file) {
        Ingredient ingredient = ingredientRepository.findById(Id).orElseThrow(() -> new EntityNotFoundException("ingredient not found"));

        if(ingredient.getImageKey() != null){
            imageStockageService.delete(bucket, ingredient.getImageKey());
        }

        try{
            byte[] fileBytes = file.getBytes();
            String imageKey = buildImageKey(Id, Objects.requireNonNull(file.getOriginalFilename()));

            imageStockageService.upload(
                    bucket,
                    imageKey,
                    new ByteArrayInputStream(fileBytes),
                    file.getSize(),
                    file.getContentType()
            );
            return new ImageUploadResult(imageKey, DigestUtils.md5DigestAsHex(fileBytes));
        }catch (Exception e){
            throw new RuntimeException("ingredient image upload failed");
        }
    }

    @Override
    public String getImageUrl(UUID Id) {
        Ingredient ingredient = ingredientRepository.findById(Id)
                .orElseThrow(() -> new EntityNotFound(Ingredient.class));

        if (ingredient.getImageKey() == null) {
            return null;
        }

        return imageStockageService.generateReadUrl(
                bucket,
                ingredient.getImageKey(),
                EXPIRY
        );
    }

    @Override
    public void deleteImage(UUID Id) {
        Ingredient ingredient = ingredientRepository.findById(Id)
                .orElseThrow(() -> new EntityNotFoundException("ingredient not found"));

        if (ingredient.getImageKey() != null) {
            imageStockageService.delete(bucket, ingredient.getImageKey());
            ingredient.setImageKey(null);
        }
    }


    private String buildImageKey(UUID Id, String filename) {
        String ext = filename.substring(filename.lastIndexOf("."));
        return "ingredient/%s/%s%s".formatted(
                Id,
                UUID.randomUUID(),
                ext
        );
    }
}
