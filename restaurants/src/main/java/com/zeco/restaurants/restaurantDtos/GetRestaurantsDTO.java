package com.zeco.restaurants.restaurantDtos;

import com.zeco.restaurants.model.Dishes;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class GetRestaurantsDTO {
    //UUID userID;
    UUID restaurantID;
    String postCode;
    String location;
    String address;
    String description;
    String branding;
    String restaurantType;
    String restaurantName;
    double longitude;
    double latitude;
    List<GetDishesDTO> dishes;
}
