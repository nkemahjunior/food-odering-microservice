package com.zeco.zecoEats.deliveries.dtos;

public record AcceptOrDeclineDeliveryDTO(
        long orderID,
        long driverID
) {
}
