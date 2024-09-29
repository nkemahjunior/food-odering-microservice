package com.zeco.restaurants.restaurantDtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderDishAndSpice {

    private Long dishID;
    List<Long> spiceIDs;

}
