package com.zeco.zecoEats.restaurants.restaurantDtos;


import com.zeco.zecoEats.restaurants.model.Cuisines;
import com.zeco.zecoEats.restaurants.model.RestaurantOperationalTimes;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


@Builder
@Data
public class CreateRestaurantDTO {

    private UUID restaurantID;
    private UUID userID;
    private String postCode;
    private String location;
    private String address;
    private String description;
    private String branding;
    private String restaurantType;
    private List<RestaurantOperationalTimes> operationalTimes;
    private List<Cuisines> cuisines;
    private String restaurantName;
    private double longitude;
    private double latitude;
    private BigDecimal minPricePerOrder;
    private BigDecimal maxPricePerOrder;

}
