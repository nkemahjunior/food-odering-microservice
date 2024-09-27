package com.zeco.restaurants.service;

import com.zeco.restaurants.model.Cuisines;
import com.zeco.restaurants.model.Dishes;
import com.zeco.restaurants.model.Menus;
import com.zeco.restaurants.model.Restaurant;
import com.zeco.restaurants.repository.CuisineRepository;
import com.zeco.restaurants.repository.DishesRepository;
import com.zeco.restaurants.repository.MenusRepository;
import com.zeco.restaurants.repository.RestaurantRepository;
import com.zeco.restaurants.restaurantDtos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final CuisineRepository cuisineRepository;
    private final MenusRepository menusRepository;
    private final DishesRepository dishesRepository;

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

        return CreateRestaurantDTO.builder()
                .restaurantID(savedRes.getRestaurantID())
                .userID(savedRes.getUserID())
                .postCode(savedRes.getPostCode())
                .location(savedRes.getLocation())
                .address(savedRes.getAddress())
                .description(savedRes.getDescription())
                .branding(savedRes.getBranding())
                .restaurantType(savedRes.getRestaurantType())
                .operationalTimes(savedRes.getOperationalTimes())
                .cuisines(new ArrayList<>(savedRes.getCuisinesSet()))
                .restaurantName(savedRes.getRestaurantName())
                .longitude(savedRes.getLongitude())
                .latitude(savedRes.getLatitude())
                .minPricePerOrder(savedRes.getMinPricePerOrder())
                .maxPricePerOrder(savedRes.getMaxPricePerOrder())
                .build();
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
    public CreateMenuDTO createMenu(CreateMenuDTO createMenuDTO){
        log.info("**** creating menu - ****");
        Restaurant restaurant = restaurantRepository.findById(createMenuDTO.restaurant()).orElseThrow(() -> new NoSuchElementException("restaurant not found"));

        Menus menu = new Menus();
        menu.setRestaurantID(restaurant);
        menu.setMenuName(createMenuDTO.menuName());

        Menus savedMenu = menusRepository.save(menu);
        log.info("**** finished creating menu - ****");

        return new CreateMenuDTO(savedMenu.getMenuID(),savedMenu.getRestaurantID().getRestaurantID(), savedMenu.getMenuName());
    }


    /**
     *
     * create new dish and its spices
     */
    public CreateDishDTO createDish(CreateDishDTO createDishDTO){
        log.info("**** creating dish - ****");
        Menus menu = menusRepository.findById(createDishDTO.menuID()).orElseThrow(() -> new NoSuchElementException("Menu not found"));
        Restaurant restaurant = restaurantRepository.findById(createDishDTO.restaurantID()).orElseThrow(() -> new NoSuchElementException("Restaurant not found"));

        Dishes dish = new Dishes();
        dish.setRestaurant(restaurant);
        dish.setMenu(menu);
        dish.setCookingTime(createDishDTO.cookingTime());
        dish.setDescription(createDishDTO.description());
        dish.setPrice(createDishDTO.price());
        dish.setDiscount(createDishDTO.discount());
        dish.setDiscountPrice(createDishDTO.discountPrice());
        dish.setLikes(createDishDTO.likes());

        createDishDTO.spice().forEach(dish::addSpices);
        Dishes sd = dishesRepository.save(dish);

        log.info("**** finished creating dish - ****");

        return new CreateDishDTO(sd.getDishID(),sd.getRestaurant().getRestaurantID(),sd.getMenu().getMenuID(), sd.getCookingTime(),
                sd.getDescription(), sd.getPrice(), sd.getDiscount(), sd.getDiscountPrice(), sd.getLikes(),
                sd.getImageUrl(), sd.getSpicesList());
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

        return new CreateDishDTO(sd.getDishID(),sd.getRestaurant().getRestaurantID(),sd.getMenu().getMenuID(), sd.getCookingTime(),
                sd.getDescription(), sd.getPrice(), sd.getDiscount(), sd.getDiscountPrice(), sd.getLikes(),
                sd.getImageUrl(), sd.getSpicesList());
    }


/*    public Page<Restaurant> getRestaurantsInALocation(String location, int pageNum, int size){
        Page<Restaurant> restaurants = restaurantRepository.findByLocation(location, PageRequest.of(0, 5));
        return  restaurants;
    }*/

    /**
     *
     * @param location: location where user wants to get restaurants from
     * @param pageable: size of data
     * @return: restaurants found in that location along with their dishes (paginated)
     */

    public Page<GetRestaurantsDTO> getRestaurantsInALocation(String location, Pageable pageable){
        log.info("**** getting restaurants from the location - {} ****",location);
        Page<Restaurant> restaurants = restaurantRepository.findByLocation(location,pageable);

        log.info("**** got the restaurants available in, now going to convert to dto - {} ****",location);
       List<GetRestaurantsDTO> restaurantsDTOS = restaurants.stream().map((el -> {
           log.info("**** mapping restaurants to dto ****");
            GetRestaurantsDTO gr = GetRestaurantsDTO.builder()
                            .restaurantID(el.getRestaurantID())
                            .postCode(el.getPostCode())
                            .address(el.getAddress())
                            .description(el.getDescription())
                            .branding(el.getBranding())
                            .restaurantName(el.getRestaurantName())
                            .longitude(el.getLongitude())
                            .latitude(el.getLatitude())
                            .dishes(new ArrayList<>())
                            .build();


                         el.getDishes().forEach(dish -> {
                                log.info("**** getting dishes for the restaurant - {}****", el.getRestaurantName());
                                GetDishesDTO getDishesDTO = GetDishesDTO.builder()
                                        .cookingTime(dish.getCookingTime())
                                        .description(dish.getDescription())
                                        .price(dish.getPrice())
                                        .discount(dish.getDiscount())
                                        .discountPrice(dish.getDiscountPrice())
                                        .likes(dish.getLikes())
                                        .imageUrl(dish.getImageUrl())
                                        .build();

                             gr.getDishes().add(getDishesDTO);

                         });
                         log.info("**** finished getting dishes for the restaurant - {} ****", el.getRestaurantName());
                          return gr;
        })).toList();

        log.info("**** finished converting restaurants in - {}  to dto****",location);
        return new PageImpl<>(restaurantsDTOS, pageable, restaurants.getTotalElements());
    }


}

