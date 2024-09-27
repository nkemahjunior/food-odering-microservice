package com.zeco.restaurants.restaurantDtos;

import com.zeco.restaurants.model.Spices;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record CreateDishDTO(
        long dishID, // only for response
        UUID restaurantID,
        Long menuID,
        String cookingTime,
        String description,
        BigDecimal price,
        Boolean discount,
        Long discountPrice,
        Long likes,
        String imageUrl,
        List<Spices> spice

) {
}
