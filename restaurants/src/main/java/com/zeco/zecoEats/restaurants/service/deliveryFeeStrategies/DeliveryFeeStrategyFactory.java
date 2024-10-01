package com.zeco.zecoEats.restaurants.service.deliveryFeeStrategies;

import com.zeco.zecoEats.restaurants.restaurantDtos.GetDeliveryFee;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeliveryFeeStrategyFactory {


    //if only one restaurant coordinate is passed to the url e.g. restaurantCoordinates=4.159513,9.276448  it will automatically be split into two strings at the comma,
    // so the list will contain " 4.159513" and "9.276448", so the first coordinate should not contain a comma
    //
    //if more than one restaurant is passed e.g. restaurantCoordinates=4.159513,9.276448 & restaurantCoordinates=6.159513,10.276448, it will be split into two strings, but
    //each of the restaurant coordinates will be joined to one including the comma so the list will contain "4.159513,9.276448" and "6.159513,10.276448", so the first
    //element will contain a comma
    public static DeliveryFeeStrategy getStrategy(List<String> restaurantCoordinates) {
        if (restaurantCoordinates.get(0).contains(",")) {
            return new MultipleRestaurantsStrategy();
        } else {
            return new SingleRestaurantStrategy();
        }
    }


    public GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates) {
        DeliveryFeeStrategy strategy = DeliveryFeeStrategyFactory.getStrategy(restaurantCoordinates);
        return strategy.calculateDeliveryFee(customerLongitude, customerLat, restaurantCoordinates);
    }

}
