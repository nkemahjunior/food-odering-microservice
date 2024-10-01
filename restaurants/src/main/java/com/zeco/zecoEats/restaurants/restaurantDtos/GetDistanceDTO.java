package com.zeco.zecoEats.restaurants.restaurantDtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetDistanceDTO {
    private String duration;
    private String distance;
}
