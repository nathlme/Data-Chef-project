package com.datachef.datachef.ServiceImpl;

import com.datachef.datachef.service.ImageStockageService;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URI;

@Service
@RequiredArgsConstructor
public class ImageStockageServiceMinioImpl implements ImageStockageService {

    private final MinioClient minioClient;

    @Value("${MINIO_PUBLIC_ENDPOINT}")
    private String publicEndpoint;


    @Override
    public void upload(String bucket, String imageKey, InputStream stream, long size, String contentType) {

        try{
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(imageKey)
                            .stream(stream,size,-1)
                            .contentType(contentType)
                            .build()
            );
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void delete(String bucket, String imageKey) {

        try{
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(imageKey)
                            .build()
            );
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public String generateReadUrl(String bucket, String imageKey, int expirySeconds) {
        try{
            String internalUrl = minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(bucket)
                            .object(imageKey)
                            .expiry(expirySeconds)
                            .build()
            );

            return rewriteToPublicEndpoint(internalUrl);
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    private String rewriteToPublicEndpoint(String internalUrl){
        URI uri = URI.create(internalUrl);
        return publicEndpoint + uri.getPath() + "?" + uri.getQuery();
    }
}
