package com.zeco.restaurants.service.searchStrategies;

import com.zeco.restaurants.restaurantDtos.GetRestaurantsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchStrategy {

    Page<GetRestaurantsDTO> search(String searchCriteria, Pageable pageable);
}
