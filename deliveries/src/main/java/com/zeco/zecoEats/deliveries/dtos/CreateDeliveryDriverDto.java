package com.deliveries.dtos;

import java.util.UUID;

public record CreateDeliveryDriverDto(
        UUID userID,
        String vehicleType
) {
}
