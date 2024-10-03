package com.zeco.zecoEats.restaurants.fileUpload;
import com.zeco.zecoEats.restaurants.restaurantDtos.CreateDishDTO;
import com.zeco.zecoEats.restaurants.service.RestaurantService;
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

import java.time.LocalDateTime;

@Slf4j
@Service
public class S3clientService {

    @Autowired
    private S3AsyncClient s3Client;

    @Autowired
    private RestaurantService restaurantService;


    @Retryable(maxAttempts = 5, backoff = @Backoff(delay = 2000, multiplier = 2000))
    public CreateDishDTO uploadDishPicture(MultipartFile picture, Long dishID)  {
        try{
            log.info("**** Starting to upload photo for dish -{}****",dishID);

            String key = "dish-"+LocalDateTime.now();
             s3Client.putObject( req -> req.bucket("zeco-eats")
                                    .contentType(picture.getContentType())
                                    .key(key),
                            AsyncRequestBody.fromBytes(picture.getBytes()))
                   .join();

            // Save the URL in the database after successful upload
            log.info("**** Successfully uploaded photo for dishID {} ****", dishID);
           return  restaurantService.saveDishImageUrl(key,dishID);


        }catch (Exception ex){
            log.error("**** failed to upload picture for dish -{}****",dishID);
            log.error(ex.getMessage());
        }
        return null;
    }


/* putObjectResponse.thenAccept(el -> {
        log.info("**** finished uploading the menu photo ****");
    }).exceptionally(ex -> {
        log.error("**** error uploading photo of menu ****");
        log.error(ex.getMessage());
        return null;
    });*/

}
