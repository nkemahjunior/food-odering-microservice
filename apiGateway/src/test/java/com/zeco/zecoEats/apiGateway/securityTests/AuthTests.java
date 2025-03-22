package com.zeco.zecoEats.apiGateway.securityTests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.Arrays;
import java.util.stream.Collectors;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockJwt;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureWebTestClient
public class AuthTests {
    @Autowired
    private WebTestClient webTestClient;


    @BeforeEach
    public void setUp() {
        this.webTestClient = webTestClient.mutate()
                .defaultHeader("X-Forwarded-For", "192.168.1.1") // Fake IP
                .build();
    }

    //helper method
    public WebTestClient authenticatedClient(String... authorities) {
        return webTestClient.mutateWith(mockJwt()
                .authorities(
                        Arrays.stream(authorities)
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList()))
                );
    }

    @Test
    public void testConfigServerEndpointWithAdminAuthority() {
        authenticatedClient("ADMIN")
                .get()
                .uri("/api/configServer/actuator/health")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    public void testConfigServerEndpointWithWrongAuthority() {
        authenticatedClient("RESTAURANT_OWNER")
                .get()
                .uri("/api/configServer/actuator/health")
                .exchange()
                .expectStatus().isForbidden();
    }

    @Test
    public void testRestaurantsEndpointWithRestaurantOwnerAuthority() {
        authenticatedClient("RESTAURANT_OWNER")
                .get()
                .uri("/_p/api/restaurants/testPrivate")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    public void testRestaurantsEndpointWithWrongAuthority() {
        authenticatedClient("DELIVERY_DRIVER")
                .get()
                .uri("/_p/api/restaurants/testPrivate")
                .exchange()
                .expectStatus().isForbidden();
    }

    @Test
    public void testDeliveriesEndpointWithDeliveryDriverAuthority() {
        authenticatedClient("DELIVERY_DRIVER")
                .get()
                .uri("/_p/api/deliveries/testPrivate")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    public void testDeliveriesEndpointWithWrongAuthority() {
        authenticatedClient("CUSTOMER")
                .get()
                .uri("/_p/api/deliveries/testPrivate")
                .exchange()
                .expectStatus().isForbidden();
    }

    @Test
    public void testUsersEndpointWithAcceptedAuthorities() {
        authenticatedClient("CUSTOMER", "RESTAURANT_OWNER", "DELIVERY_DRIVER")
                .get()
                .uri("/_p/api/users/testPrivate")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    public void testUsersEndpointWithUnAcceptedAuthorities() {
        authenticatedClient("no authority")
                .get()
                .uri("/_p/api/users/testPrivate")
                .exchange()
                .expectStatus().isForbidden();
    }

    @Test
    public void testRestaurantsEndpointWithNoAuth() {
        webTestClient
                .get()
                .uri("/_p/api/restaurants/testPrivate")
                .exchange()
                .expectStatus().isUnauthorized();
    }

    @Test
    public void testAPrivateEndpointWithNoAuth() {
        webTestClient
                .get()
                .uri("/_p/api/restaurants/testPrivate")
                .exchange()
                .expectStatus().isUnauthorized();
    }

    @Test
    public void testPublicApiEndpointWithNoAuth() {
        webTestClient
                .get()
                .uri("/api/restaurants/test")
                .exchange()
                .expectStatus().isOk();
    }

}
