package com.zeco.restaurants.service.searchStrategies;

import com.zeco.restaurants.restaurantDtos.GetRestaurantsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class SearchFactory {

    public static SearchStrategy getSearchStrategy(SearchType type){
        switch (type){
            case LOCATION :
                return new SearchByLocation();
            default:
                throw new IllegalArgumentException("Unknown search type: " + type);
        }
    }

    public Page<GetRestaurantsDTO> search(SearchType type, String searchCriteria, Pageable pageable){
        SearchStrategy strategy = SearchFactory.getSearchStrategy(type);
        return strategy.search(searchCriteria, pageable);
    }
}
