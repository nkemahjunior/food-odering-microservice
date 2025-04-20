package com.zeco.zecoEats.restaurants.controller;


import com.zeco.zecoEats.restaurants.fileUpload.S3clientService;
import com.zeco.zecoEats.restaurants.restaurantDtos.CreateDishDTO;
import com.zeco.zecoEats.restaurants.restaurantDtos.CreateMenuDTO;
import com.zeco.zecoEats.restaurants.restaurantDtos.CreateRestaurantDTO;
import com.zeco.zecoEats.restaurants.restaurantDtos.PlaceOrderDTO;
import com.zeco.zecoEats.restaurants.service.OrdersService;
import com.zeco.zecoEats.restaurants.service.RestaurantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/_p/restaurants")
public class RestaurantControllerPrivate {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private S3clientService s3clientService;

    @GetMapping("/testPrivate")
    public ResponseEntity<String> testEndpoint(){
        return ResponseEntity.ok( "working private");
    }

    @PostMapping("/new")
    public ResponseEntity<CreateRestaurantDTO> createRestaurantEndpoint(@RequestBody CreateRestaurantDTO createRestaurantDTO) {
        return ResponseEntity.ok(restaurantService.createRestaurant(createRestaurantDTO));
    }

    @PostMapping("/menu")
    public ResponseEntity<CreateMenuDTO> createRestaurantMenuEndpoint(@RequestBody CreateMenuDTO createMenuDTO) {
        return ResponseEntity.ok(restaurantService.createMenu(createMenuDTO));
    }

    @PostMapping("/menu/dish")
    public ResponseEntity<CreateDishDTO> createRestaurantDishEndpoint(@RequestBody CreateDishDTO createDishDTO) {
        return ResponseEntity.ok(restaurantService.createDish(createDishDTO));
    }


    @PostMapping(value = "/menu/dish/picture/{dishID}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<CreateDishDTO> uploadDishPictureEndpoint(@RequestPart("incomingFile") MultipartFile incomingFile, @PathVariable("dishID") Long dishID){
        return ResponseEntity.ok( s3clientService.uploadDishPicture(incomingFile, dishID));
    }

/*    @GetMapping(value = "/{location}" )//?page=0&size=5
    public ResponseEntity< Page<Restaurant>> getRestaurantsInALocationEndpoint(@PathVariable String location, @RequestParam("page") int page, @RequestParam("size") int size){
        //return ResponseEntity.ok(restaurantService.getRestaurantsInALocation(location,page, size ));
    }*/

    @PostMapping("/order")
    public ResponseEntity<Void> placeOrderEndpoint(@RequestBody List<PlaceOrderDTO> placeOrderDTO){

        ordersService.placeOrder(placeOrderDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
