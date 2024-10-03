package com.zeco.zecoEats.restaurants.fileUpload;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;

@Configuration
public class S3config {



    @Bean
    public S3AsyncClient S3AsyncClient(){
        return
                S3AsyncClient.crtBuilder()
                        .credentialsProvider(DefaultCredentialsProvider.create())
                        .region(Region.US_WEST_2)
                        .build();
    }
}
