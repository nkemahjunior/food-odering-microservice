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
    Float deliveryLatitude;
    Float deliveryLongitude;
    Float restaurantLatitude;
    Float restaurantLongitude;


    // Method to check if none of the fields are null
    public boolean areFieldsNonNull() {
        return orderID != null &&
                restaurantID != null &&
                userID != null &&
                estimatedTimeToFinish != null &&
                orderTime != null &&
                orderComplete != null &&
                deliveryAddress != null &&
                deliveryInstructions != null &&
                deliveryLatitude != null &&
                deliveryLongitude != null;
    }
}
