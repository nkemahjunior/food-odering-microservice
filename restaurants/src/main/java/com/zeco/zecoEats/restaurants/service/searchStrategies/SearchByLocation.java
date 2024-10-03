package com.zeco.restaurants.service.searchStrategies;

import com.zeco.restaurants.model.Restaurant;
import com.zeco.restaurants.repository.RestaurantRepository;
import com.zeco.restaurants.restaurantDtos.DTOFactory;
import com.zeco.restaurants.restaurantDtos.GetDishesDTO;
import com.zeco.restaurants.restaurantDtos.GetRestaurantsDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SearchByLocation implements SearchStrategy{

    @Autowired
    RestaurantRepository restaurantRepository;

    @Override
    public Page<GetRestaurantsDTO> search(String location, Pageable pageable) {
        Page<Restaurant> restaurants = restaurantRepository.findByLocation(location,pageable);
        List<GetRestaurantsDTO> restaurantsDTOS = restaurantsToPageableDto(restaurants);
        return new PageImpl<>(restaurantsDTOS, pageable, restaurants.getTotalElements());
    }


    public List<GetRestaurantsDTO> restaurantsToPageableDto(Page<Restaurant> restaurants){
        List<GetRestaurantsDTO> restaurantsDTOS = restaurants.stream().map((el -> {
            GetRestaurantsDTO gr = DTOFactory.getRestaurantsDTO(el);

            el.getDishes().forEach(dish -> {
                GetDishesDTO getDishesDTO = DTOFactory.getDishDTO(dish);
                gr.getDishes().add(getDishesDTO);
            });
            return gr;
        })).toList();

        return restaurantsDTOS;
    }
}
