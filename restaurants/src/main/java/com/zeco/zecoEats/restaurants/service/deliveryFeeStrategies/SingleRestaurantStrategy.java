package com.zeco.restaurants.service.deliveryFeeStrategies;

import com.zeco.restaurants.Exceptions.DistanceTooFar;
import com.zeco.restaurants.restaurantDtos.GetDeliveryFee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;


@Component
public class SingleRestaurantStrategy extends FetchDistanceFactory implements DeliveryFeeStrategy {

    @Autowired
    private WebClient webClient;

    @Value("${mapbox.access-token}")
    private String accessToken;


    @Override
    public GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates) {
        URI uri = createUri(accessToken, customerLongitude,customerLat,restaurantCoordinates.get(0),restaurantCoordinates.get(1));
        Mono<String> distanceMono = fetchDistance(uri, webClient);
        String distance = distanceMono.block();

        assert distance != null;
        double price = getFee(Double.parseDouble(distance));
        if(price < 0) throw new DistanceTooFar("Restaurant is too far from your location");

        return  new GetDeliveryFee(price);
    }
}
