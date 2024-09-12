package com.zeco.restaurants.restaurantDtos;


import com.zeco.restaurants.model.Cuisines;
import com.zeco.restaurants.model.RestaurantOperationalTimes;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
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
    private Float longitude;
    private Float latitude;
    private BigDecimal minPricePerOrder;
    private BigDecimal maxPricePerOrder;

}
