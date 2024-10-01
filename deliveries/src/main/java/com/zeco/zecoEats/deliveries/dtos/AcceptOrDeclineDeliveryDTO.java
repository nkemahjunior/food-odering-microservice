package com.deliveries.dtos;

public record AcceptOrDeclineDeliveryDTO(
        long orderID,
        long driverID
) {
}
