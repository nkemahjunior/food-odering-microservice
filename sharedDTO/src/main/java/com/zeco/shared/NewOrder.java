package com.zeco.shared;

import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@ToString
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewOrder {
    Long orderID;
    UUID restaurantID;
    UUID user_id; // id of customer who placed the order
    Long estimatedTimeToFinish;
    ZonedDateTime orderTime;
    Boolean orderComplete;
    String deliveryAddress;
    String deliveryInstructions;
    Float deliveryLatitude;
    Float deliveryLongitude;

    // Method to check if none of the fields are null
    public boolean areFieldsNonNull() {
        return orderID != null &&
                restaurantID != null &&
                user_id != null &&
                estimatedTimeToFinish != null &&
                orderTime != null &&
                orderComplete != null &&
                deliveryAddress != null &&
                deliveryInstructions != null &&
                deliveryLatitude != null &&
                deliveryLongitude != null;
    }
}
