package com.datachef.datachef.service;

import java.io.InputStream;

public interface ImageStockageService {

    void upload(
            String bucket,
            String imageKey,
            InputStream stream,
            long size,
            String contentType
    );

    void delete(
            String bucket,
            String imageKey
    );

    String generateReadUrl(
            String bucket,
            String imageKey,
            int expirySeconds
    );
}
