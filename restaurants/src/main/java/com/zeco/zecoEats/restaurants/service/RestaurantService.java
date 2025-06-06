package com.zeco.zecoEats.restaurants.service;

import com.zeco.zecoEats.restaurants.model.Dishes;
import com.zeco.zecoEats.restaurants.model.Menus;
import com.zeco.zecoEats.restaurants.model.Restaurant;
import com.zeco.zecoEats.restaurants.repository.CuisineRepository;
import com.zeco.zecoEats.restaurants.repository.DishesRepository;
import com.zeco.zecoEats.restaurants.repository.MenusRepository;
import com.zeco.zecoEats.restaurants.repository.RestaurantRepository;
import com.zeco.zecoEats.restaurants.restaurantDtos.*;
import com.zeco.zecoEats.restaurants.service.searchStrategies.SearchFactory;
import com.zeco.zecoEats.restaurants.service.searchStrategies.SearchType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.NoSuchElementException;

@Slf4j
@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private CuisineRepository cuisineRepository;

    @Autowired
    private MenusRepository menusRepository;

    @Autowired
    private DishesRepository dishesRepository;

    @Autowired
    SearchFactory searchFactory;

    /**
     *
     * creates a restaurant
     */
    //TODO check the minPricePerOder and max when creating a restaurant
    public CreateRestaurantDTO createRestaurant(CreateRestaurantDTO createRestauReq)  {
        log.info("****creating restaurant object****");
        Restaurant restaurant = setRestaurantValues(createRestauReq);

        Restaurant savedRes = restaurantRepository.save(restaurant);
        log.info("****saved restaurant object****");
        return DTOFactory.createRestaurantDTO(savedRes);
    }

    public Restaurant setRestaurantValues(CreateRestaurantDTO createRestauReq){
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantID(createRestauReq.getRestaurantID());
        restaurant.setUserID(createRestauReq.getUserID());
        restaurant.setPostCode(createRestauReq.getPostCode());
        restaurant.setLocation(createRestauReq.getLocation());
        restaurant.setAddress(createRestauReq.getAddress());
        restaurant.setDescription(createRestauReq.getDescription());
        restaurant.setBranding(createRestauReq.getBranding());
        restaurant.setRestaurantName(createRestauReq.getRestaurantName());
        restaurant.setLatitude(createRestauReq.getLatitude());
        restaurant.setLongitude(createRestauReq.getLongitude());
        restaurant.setMinPricePerOrder(createRestauReq.getMinPricePerOrder());
        restaurant.setMaxPricePerOrder(createRestauReq.getMaxPricePerOrder());

        createRestauReq.getOperationalTimes().forEach(restaurant::addOperationalTimes);

        createRestauReq.getCuisines().forEach(el -> {
            cuisineRepository.findById(el.getCuisineID()).ifPresent(restaurant::addCousines);
        });

        return restaurant;
    }

    /**
     *
     * creates a new menu
     */
    @CacheEvict(value = "menus", key = "#createMenuDTO.restaurant()")
    public CreateMenuDTO createMenu(CreateMenuDTO createMenuDTO){
        log.info("**** creating menu - ****");
        Restaurant restaurant = restaurantRepository.findById(createMenuDTO.restaurant()).orElseThrow(() -> new NoSuchElementException("restaurant not found"));

        Menus menu = new Menus();
        menu.setRestaurantID(restaurant);
        menu.setMenuName(createMenuDTO.menuName());

        Menus savedMenu = menusRepository.save(menu);
        log.info("**** finished creating menu - ****");

        return DTOFactory.createMenuDto(savedMenu);
    }


    /**
     *
     * create new dish and its spices
     */
    @CacheEvict(value = "dishes", key = "#createDishDTO.restaurantID()")
    public CreateDishDTO createDish(CreateDishDTO createDishDTO){
        log.info("**** creating dish - ****");
        Menus menu = menusRepository.findById(createDishDTO.menuID()).orElseThrow(() -> new NoSuchElementException("Menu not found"));
        Restaurant restaurant = restaurantRepository.findById(createDishDTO.restaurantID()).orElseThrow(() -> new NoSuchElementException("Restaurant not found"));
        Dishes dish = setDishValues(restaurant, menu, createDishDTO);

        createDishDTO.spice().forEach(dish::addSpices);
        Dishes sd = dishesRepository.save(dish);

        log.info("**** finished creating dish - ****");
        return DTOFactory.createDishDTO(sd);
    }


    public Dishes setDishValues(Restaurant restaurant, Menus menu, CreateDishDTO createDishDTO){
        Dishes dish = new Dishes();
        dish.setRestaurant(restaurant);
        dish.setMenu(menu);
        dish.setCookingTime(createDishDTO.cookingTime());
        dish.setDescription(createDishDTO.description());
        dish.setPrice(createDishDTO.price());
        dish.setDiscount(createDishDTO.discount());
        dish.setDiscountPrice(createDishDTO.discountPrice());
        dish.setLikes(createDishDTO.likes());

        return dish;
    }


    /**
     * save the image url of a dish to the database after uploading it to s3
     */
    public CreateDishDTO saveDishImageUrl(String key, Long dishID){

        log.info("**** adding dish image url to database- ****");
        Dishes dish = dishesRepository.findById(dishID).orElseThrow(() -> new NoSuchElementException("Dish not found"));
        dish.setImageUrl("https://zeco-eats.s3.us-west-2.amazonaws.com/"+key);
        Dishes sd = dishesRepository.save(dish);
        log.info("**** saved image of dish url in database- ****");

        return DTOFactory.createDishDTO(sd);

    }

    @Cacheable(value = "restaurants", key = "#location + '-' + #pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<GetRestaurantsDTO> getRestaurantsInALocation(String location, Pageable pageable) {
        return searchFactory.search(SearchType.LOCATION, location, pageable);
    }

}

