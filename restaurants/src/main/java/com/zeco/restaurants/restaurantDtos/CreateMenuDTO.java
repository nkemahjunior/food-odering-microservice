package com.zeco.restaurants.restaurantDtos;



import java.util.UUID;

public record CreateMenuDTO(UUID restaurant, String menuName) {
}
