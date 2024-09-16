package com.deliveries.dtos;


import java.awt.*;

public record AddAvailableDriverDTO(
        long driverID,
        double longitude,
        double latitude,
        String fcmRegistrationToken

) {
}
