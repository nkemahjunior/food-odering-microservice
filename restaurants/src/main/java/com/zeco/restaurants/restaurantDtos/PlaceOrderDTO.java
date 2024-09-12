package com.zeco.restaurants.restaurantDtos;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;


public record PlaceOrderDTO(
    //Long orderID,
    /*List<Long> dishID,
    List<Integer> spiceIDs,*/

    UUID restaurantID,
    List<OrderDishAndSpice> dishAndSpices,
    UUID user_id, // id of customer who placed the order
    String specialInstructions,
    Long estimatedTimeToFinish,
    ZonedDateTime orderTime,
    Boolean orderComplete,
    String deliveryAddress,
    String deliveryInstructions,
    Float deliveryLatitude,
    Float deliveryLongitude
) {
}
