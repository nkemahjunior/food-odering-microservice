package com.zeco.restaurants.restaurantDtos;


import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class GetUserResponseDTO {
    UUID userID;
     String firstName;
     String lastName;
    String email;
     Boolean online;
     String phone;
     String address;
     Double longitude;
    Double latitude;

}
