package com.zeco.restaurants.fileUpload;
import com.zeco.restaurants.service.RestaurantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
public class S3clientService {

    @Autowired
    private S3AsyncClient s3Client;

    @Autowired
    private RestaurantService restaurantService;


    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 5000, multiplier = 2000))
    public void uploadPicture( MultipartFile picture, Long dishID)  {
        try{
            log.info("**** Starting to upload photo of menu****");

            String key = "menu-"+LocalDateTime.now();
             s3Client.putObject( req -> req.bucket("zeco-eats")
                                    .contentType(picture.getContentType())
                                    .key(key),
                            AsyncRequestBody.fromBytes(picture.getBytes()))
                   .join();
            restaurantService.saveDishImageUrl(key,dishID);

        }catch (IOException ex){
            log.error("**** picture uploading failed****");
            log.error(ex.getMessage());
        }

    }


/* putObjectResponse.thenAccept(el -> {
        log.info("**** finished uploading the menu photo ****");
    }).exceptionally(ex -> {
        log.error("**** error uploading photo of menu ****");
        log.error(ex.getMessage());
        return null;
    });*/

}
