package com.zeco.restaurants.controller;


import com.zeco.restaurants.fileUpload.S3clientService;
import com.zeco.restaurants.model.Restaurant;
import com.zeco.restaurants.restaurantDtos.*;
import com.zeco.restaurants.service.OrdersService;
import com.zeco.restaurants.service.RestaurantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private OrdersService ordersService;

    @Autowired
    private S3clientService s3clientService;


    @PostMapping("/new")
    public ResponseEntity<Void> createRestaurantEndpoint(@RequestBody CreateRestaurantDTO createRestaurantDTO) {
        restaurantService.createRestaurant(createRestaurantDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/menu")
    public ResponseEntity<Void> createRestaurantMenuEndpoint(@RequestBody CreateMenuDTO createMenuDTO) {
        restaurantService.createMenu(createMenuDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/menu/dish")
    public ResponseEntity<Void> createRestaurantDishEndpoint(@RequestBody CreateDishDTO createDishDTO) {
        restaurantService.createDish(createDishDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping(value = "/menu/picture/{dishID}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Void> uploadMenuPictureEndpoint(@RequestPart("incomingFile") MultipartFile incomingFile, @PathVariable("dishID") Long dishID){
        s3clientService.uploadPicture(incomingFile, dishID);
        return new ResponseEntity<>(HttpStatus.OK);
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

    @GetMapping("/location/{location}" )//?page=0&size=5
    public ResponseEntity<Page<GetRestaurantsDTO>> getRestaurantsInALocationEndpoint(@PathVariable String location, @RequestParam("page") int page, @RequestParam("size") int size){
        return ResponseEntity.ok(restaurantService.getRestaurantsInALocation(location,PageRequest.of(page, size) ));
    }

/*    @GetMapping("order/deliveryfee")
    public ResponseEntity<Void> getDeliveryFeeForOrdersEndpoint(@RequestParam("customerLat") String customerLat, @RequestParam("customerLongitude") String customerLongitude,
                                                                @RequestParam("restaurantLat") String resturantLat, @RequestParam("restaurantLongitude") String restaurantLongitude){
        ordersService.calculateDeliveryFee(customerLat,customerLongitude,resturantLat,restaurantLongitude);
        return new ResponseEntity<>(HttpStatus.OK);
    }*/

    @GetMapping("order/deliveryfee")
    public ResponseEntity<GetDeliveryFee> getDeliveryFeeForOrdersEndpoint( @RequestParam("customerLongitude") String customerLongitude,@RequestParam("customerLat") String customerLat,
                                                                @RequestParam List<String> restaurantCoordinates){

        return ResponseEntity.ok( ordersService.calculateDeliveryFee(customerLongitude,customerLat,restaurantCoordinates));
    }

}
