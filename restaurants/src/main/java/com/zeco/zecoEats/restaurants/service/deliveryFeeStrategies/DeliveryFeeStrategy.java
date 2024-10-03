package com.zeco.restaurants.service.deliveryFeeStrategies;

import com.zeco.restaurants.restaurantDtos.GetDeliveryFee;

import java.util.List;

public interface DeliveryFeeStrategy {

    GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates );
}
