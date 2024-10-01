package com.zeco.zecoEats.restaurants.service.searchStrategies;

import com.zeco.zecoEats.restaurants.restaurantDtos.GetRestaurantsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchStrategy {

    Page<GetRestaurantsDTO> search(String searchCriteria, Pageable pageable);
}
