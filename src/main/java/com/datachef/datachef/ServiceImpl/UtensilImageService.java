package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.dto.image.ImageUploadResult;
import com.datachef.datachef.model.Utensil;
import com.datachef.datachef.repository.UtensilRepository;
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
public class UtensilImageService implements ImageService {

    private final UtensilRepository utensilRepository;
    private final ImageStockageService imageStockageService;
    private static final int EXPIRY = 3600;

    @Value("${MINIO_BUCKET}")
    private String bucket;

    @Override
    public ImageUploadResult uploadImage(UUID Id, MultipartFile file) {
        Utensil utensil = utensilRepository.findById(Id).orElseThrow(() -> new EntityNotFoundException("utensil not found"));

        if(utensil.getImageKey() != null){
            imageStockageService.delete(bucket, utensil.getImageKey());
        }

        try{
            byte[] fileBytes = file.getBytes();
            String imageKey = buildImageKey(Id, file.getOriginalFilename());
            imageStockageService.upload(
                    bucket,
                    imageKey,
                    new ByteArrayInputStream(fileBytes),
                    file.getSize(),
                    file.getContentType()
            );
            return new ImageUploadResult(imageKey, DigestUtils.md5DigestAsHex(fileBytes));
        }catch (Exception e){
            throw new RuntimeException("utensil image upload failed");
        }
    }

    @Override
    public String getImageUrl(UUID Id) {
        Utensil utensil = utensilRepository.findById(Id)
                .orElseThrow(() -> new EntityNotFoundException("utensil not found"));

        if (utensil.getImageKey() == null) {
            return null;
        }

        return imageStockageService.generateReadUrl(
                bucket,
                utensil.getImageKey(),
                EXPIRY
        );
    }

    @Override
    public void deleteImage(UUID Id) {
        Utensil utensil = utensilRepository.findById(Id)
                .orElseThrow(() -> new EntityNotFoundException("utensil not found"));

        if (utensil.getImageKey() != null) {
            imageStockageService.delete(bucket, utensil.getImageKey());
            utensil.setImageKey(null);
        }
    }


    private String buildImageKey(UUID Id, String filename) {
        String ext = filename.substring(filename.lastIndexOf("."));
        return "utensil/%s/%s%s".formatted(
                Id,
                UUID.randomUUID(),
                ext
        );
    }
}
