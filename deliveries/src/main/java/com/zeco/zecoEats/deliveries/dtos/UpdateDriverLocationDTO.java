package com.deliveries.dtos;

public record UpdateDriverLocationDTO(
        long avlDriverID,
        double longitude,
        double latitude
) {
}
