package com.deliveries.model;

public record UpdateDriverLocationDTO(
        long avlDriverID,
        double longitude,
        double latitude
) {
}
