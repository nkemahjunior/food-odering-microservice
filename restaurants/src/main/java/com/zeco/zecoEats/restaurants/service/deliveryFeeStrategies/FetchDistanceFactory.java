package com.zeco.zecoEats.restaurants.service.deliveryFeeStrategies;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;
import java.util.Map;


public abstract class FetchDistanceFactory {

    public final URI createUri( String accessToken,String customerLongitude,String customerLat, String restaurantLongitude, String restaurantLatitude){
        return  UriComponentsBuilder
                .fromHttpUrl("https://api.mapbox.com")
                .path("/directions/v5/mapbox/driving/{long1},{lat1};{long2},{lat2}")
                .queryParam("access_token",accessToken)
                .build(customerLongitude,customerLat, restaurantLongitude, restaurantLatitude);
    }



    public final Mono<String> fetchDistance(URI uri, WebClient webClient){

        Mono<String> distance =  webClient
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {}) // convert json response to key,pair values
                .map(response -> {
                    //  routes is an array of key pair values, so I can convert to a List of maps
                    Map<String, Object> route = ((List<Map<String, Object>>) response.get("routes")).get(0);
                    return String.valueOf(route.get("distance"));
                });

        return distance;
    }



    public final double getFee(double distance){

        if( distance >= 0 && distance <= 2700) return  400;
        if( distance > 2700 && distance <= 5400) return  800;
        if( distance > 5400 && distance <= 8100) return  1200;
        if( distance > 8100 && distance <= 10800) return  1600;
        if( distance >= 10800 && distance <= 13500) return  2000;
        if( distance > 13500 && distance <= 16200) return  2400;
        if( distance > 16200 && distance <= 18900) return  2800;
        if( distance > 18900 && distance <= 21600) return  3200;

        return -1;
    }
}
