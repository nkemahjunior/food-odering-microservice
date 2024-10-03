package com.zeco.zecoEats.restaurants.httpCalls;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Slf4j
@Configuration
public class ClientConfig {


    @Value("${service.users-service.baseUrl}") // from config server
    private String usersServiceBaseUrl;


    @Bean
    public  UserServiceClient userServiceConfig(){
        WebClient webClient = WebClient.builder().
                baseUrl(usersServiceBaseUrl).
                build();

        WebClientAdapter adapter = WebClientAdapter.create(webClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();

        return  factory.createClient(UserServiceClient.class);
    }
}
