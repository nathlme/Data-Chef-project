package com.datachef.datachef.ServiceImpl;


import com.datachef.datachef.model.Ingredient;
import com.datachef.datachef.model.Users;
import com.datachef.datachef.repository.IngredientRepository;
import com.datachef.datachef.repository.UserRepository;
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
@Transactional
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserImageService implements ImageService {

    private final UserRepository userRepository;
    private final ImageStockageService imageStockageService;
    private static final int EXPIRY = 3600;

    @Value("${MINIO_BUCKET}")
    private String bucket;

    @Override
    public String uploadImage(UUID Id, MultipartFile file) {
        Users user = userRepository.findById(Id).orElseThrow(() -> new EntityNotFoundException("user not found"));

        if(user.getImagekey() != null){
            imageStockageService.delete(bucket, user.getImagekey());
        }

        String imageKey = buildImageKey(Id, file.getOriginalFilename());

        try{
            imageStockageService.upload(
                    bucket,
                    imageKey,
                    file.getInputStream(),
                    file.getSize(),
                    file.getContentType()
            );
        }catch (Exception e){
            throw new RuntimeException("user image upload failed");
        }

        user.setImagekey(imageKey);
        return imageKey;
    }

    @Override
    public String getImageUrl(UUID Id) {
        Users user = userRepository.findById(Id)
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        if (user.getImagekey() == null) {
            return null;
        }

        return imageStockageService.generateReadUrl(
                bucket,
                user.getImagekey(),
                EXPIRY
        );
    }

    @Override
    public void deleteImage(UUID Id) {
        Users user = userRepository.findById(Id)
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        if (user.getImagekey() != null) {
            imageStockageService.delete(bucket, user.getImagekey());
            user.setImagekey(null);
        }
    }


    private String buildImageKey(UUID Id, String filename) {
        String ext = filename.substring(filename.lastIndexOf("."));
        return "user/%s/%s%s".formatted(
                Id,
                UUID.randomUUID(),
                ext
        );
    }
}
