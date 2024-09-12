package com.zeco.restaurants.restaurantDtos;

import lombok.Data;

@Data
public class GetDeliveryFee {

    private double deliveryFee;

    public GetDeliveryFee(double deliveryFee) {
        this.deliveryFee = deliveryFee;
    }
}
