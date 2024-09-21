package com.zeco.shared;

import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@ToString
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewOrderShared {
    Long orderID;
    UUID restaurantID;
    UUID userID; // id of customer who placed the order
    Long estimatedTimeToFinish;
    ZonedDateTime orderTime;
    Boolean orderComplete;
    String deliveryAddress;
    String deliveryInstructions;
    double deliveryLatitude;
    double deliveryLongitude;
    double restaurantLatitude;
    double restaurantLongitude;

}
