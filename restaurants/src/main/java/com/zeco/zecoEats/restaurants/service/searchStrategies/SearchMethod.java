package com.zeco.restaurants.service.searchStrategies;

import com.zeco.restaurants.restaurantDtos.GetRestaurantsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class SearchMethod {

    public Page<GetRestaurantsDTO> search(SearchStrategy strategy, String location, Pageable pageable){
       return strategy.search(location, pageable);
    }
}
