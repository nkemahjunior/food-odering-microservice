package com.zeco.zecoEats.restaurants.restaurantDtos;



import java.util.UUID;

//use menuID only when returning results
public record CreateMenuDTO(long menuID, UUID restaurant, String menuName) {
}
