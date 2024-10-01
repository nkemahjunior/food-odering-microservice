package com.zeco.zecoEats.restaurants.service.deliveryFeeStrategies;

import com.zeco.zecoEats.restaurants.Exceptions.DistanceTooFar;
import com.zeco.zecoEats.restaurants.restaurantDtos.GetDeliveryFee;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class MultipleRestaurantsStrategy extends FetchDistanceFactory implements DeliveryFeeStrategy {

    @Autowired
    private WebClient webClient;

    @Value("${mapbox.access-token}")
    private String accessToken;


    @Override
    public GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates) {
        List<String> distances = fetchMultipleDistances(customerLongitude, customerLat, restaurantCoordinates);

        double cumulativeDistance = 0;
        if(distances != null){
            for(String distance : distances){
                cumulativeDistance = cumulativeDistance + Double.parseDouble(distance);
            }
        }else {
            log.info("distance list is missing");
            throw new RuntimeException();
        }

        double price = getFee(cumulativeDistance);
        if(price < 0) throw new DistanceTooFar("Restaurant is too far from your location");

        return  new GetDeliveryFee(price);
    }



    /**
     *
     * @param customerLongitude customer longitude
     * @param customerLat customer latitude
     * @param restaurantCoordinates list of restaurant coordinates( latitude and longitude) for which the customer wants to order from
     * @return list of the distances from the respective restaurants and the customer's location
     */
    public List<String> fetchMultipleDistances(String customerLongitude,String customerLat,List<String> restaurantCoordinates ){
        List<Mono<String>> distanceMonos = restaurantCoordinates.stream().map(coordinates -> {

            // longitude, latitude in that order
            String[] latLon = coordinates.split(",");

            URI uri = createUri(accessToken, customerLongitude,customerLat,latLon[0],latLon[1]);
            return fetchDistance(uri, webClient);

        }).collect(Collectors.toList());

        List<String> distances = Flux.merge(distanceMonos).collectList().block();

        return distances;
    }


}
