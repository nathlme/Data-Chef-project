package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.service.ImageStockageService;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class ImageStockageServiceMinio implements ImageStockageService {

    private final MinioClient internalClient; // Pour upload/delete
    private final MinioClient publicClient;   // Pour générer les URLs signées

    @Value("${MINIO_BUCKET}")
    private String bucket;

    @Override
    public void upload(String bucket, String imageKey, InputStream stream, long size, String contentType) {
        try {
            internalClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(imageKey)
                            .stream(stream, size, -1)
                            .contentType(contentType)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage(), e);
        }
    }

    @Override
    public void delete(String bucket, String imageKey) {
        try {
            internalClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(imageKey)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete image: " + e.getMessage(), e);
        }
    }

    @Override
    public String generateReadUrl(String bucket, String objectKey, int expirySeconds) {
        try {
            // Génère l'URL signée accessible par le navigateur
            return publicClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(bucket)
                            .object(objectKey)
                            .expiry(expirySeconds)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate presigned URL: " + e.getMessage(), e);
        }
    }
}
