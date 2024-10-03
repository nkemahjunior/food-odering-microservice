<<<<<<< HEAD:restaurants/src/main/java/com/zeco/zecoEats/restaurants/restaurantDtos/DTOFactory.java
package com.zeco.zecoEats.restaurants.restaurantDtos;

import com.zeco.zecoEats.restaurants.model.Dishes;
import com.zeco.zecoEats.restaurants.model.Menus;
import com.zeco.zecoEats.restaurants.model.Restaurant;
=======
package com.zeco.restaurants.restaurantDtos;

import com.zeco.restaurants.model.Dishes;
import com.zeco.restaurants.model.Menus;
import com.zeco.restaurants.model.Restaurant;
>>>>>>> master:restaurants/src/main/java/com/zeco/restaurants/restaurantDtos/DTOFactory.java

import java.util.ArrayList;

public class DTOFactory {

    public static CreateRestaurantDTO createRestaurantDTO(Restaurant restaurant){
        return CreateRestaurantDTO.builder()
                .restaurantID(restaurant.getRestaurantID())
                .userID(restaurant.getUserID())
                .postCode(restaurant.getPostCode())
                .location(restaurant.getLocation())
                .address(restaurant.getAddress())
                .description(restaurant.getDescription())
                .branding(restaurant.getBranding())
                .restaurantType(restaurant.getRestaurantType())
                .operationalTimes(restaurant.getOperationalTimes())
                .cuisines(new ArrayList<>(restaurant.getCuisinesSet()))
                .restaurantName(restaurant.getRestaurantName())
                .longitude(restaurant.getLongitude())
                .latitude(restaurant.getLatitude())
                .minPricePerOrder(restaurant.getMinPricePerOrder())
                .maxPricePerOrder(restaurant.getMaxPricePerOrder())
                .build();
    }

    public static GetRestaurantsDTO getRestaurantsDTO(Restaurant restaurant){
        return GetRestaurantsDTO.builder()
                .restaurantID(restaurant.getRestaurantID())
                .postCode(restaurant.getPostCode())
                .address(restaurant.getAddress())
                .description(restaurant.getDescription())
                .branding(restaurant.getBranding())
                .restaurantName(restaurant.getRestaurantName())
                .longitude(restaurant.getLongitude())
                .latitude(restaurant.getLatitude())
                .dishes(new ArrayList<>())
                .build();
    }



    public static CreateMenuDTO createMenuDto(Menus menu){
        return new CreateMenuDTO(menu.getMenuID(),menu.getRestaurantID().getRestaurantID(), menu.getMenuName());
    }


    public static CreateDishDTO createDishDTO(Dishes dish){
        return new CreateDishDTO(dish.getDishID(),dish.getRestaurant().getRestaurantID(),dish.getMenu().getMenuID(), dish.getCookingTime(),
                dish.getDescription(), dish.getPrice(), dish.getDiscount(), dish.getDiscountPrice(), dish.getLikes(),
                dish.getImageUrl(), dish.getSpicesList());
    }

    public static GetDishesDTO getDishDTO(Dishes dish){
        return GetDishesDTO.builder()
                .cookingTime(dish.getCookingTime())
                .description(dish.getDescription())
                .price(dish.getPrice())
                .discount(dish.getDiscount())
                .discountPrice(dish.getDiscountPrice())
                .likes(dish.getLikes())
                .imageUrl(dish.getImageUrl())
                .build();
    }

}
