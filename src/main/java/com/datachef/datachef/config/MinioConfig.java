package com.datachef.datachef.config;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioConfig {

    @Bean("minioClient")
    MinioClient internalClient(
            @Value("${MINIO_INTERNAL_ENDPOINT}") String endpoint,
            @Value("${MINIO_ACCESS_KEY}") String accessKey,
            @Value("${MINIO_SECRET_KEY}") String secretKey
    ){
        return MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
    }

}
