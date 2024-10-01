package com.zeco.zecoEats.deliveries.dtos;

public record UpdateDriverLocationDTO(
        long avlDriverID,
        double longitude,
        double latitude
) {
}
