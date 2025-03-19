package com.zeco.zecoEats.apiGateway.routeConfig;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfigs {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                // Config Server Route
                .route("config-server", r -> r.path("/api/config-server/**")
                        .uri("http://localhost:8080"))

                // Deliveries Service Route
                .route("deliveries-service", r -> r.path("/api/deliveries/**")
                        .uri("http://localhost:8083"))

                // Restaurants Service Route
                .route("restaurants-service", r -> r.path("/api/restaurants/**")
                        .uri("http://localhost:8081"))

                // Users Service Route
                .route("users-service", r -> r.path("/api/users/**")
                        .uri("http://localhost:8082"))

                .build();
    }
}
