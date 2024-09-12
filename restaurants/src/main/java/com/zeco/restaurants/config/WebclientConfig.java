package com.zeco.restaurants.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebclientConfig {


    @Bean
    public WebClient webClientConfig(){
        return  WebClient.builder().
               // baseUrl("https://api.mapbox.com/directions/v5/mapbox/driving").
                build();
    }
}
