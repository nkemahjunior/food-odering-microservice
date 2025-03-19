package com.zeco.zecoEats.restaurants.controller;


import com.zeco.zecoEats.restaurants.fileUpload.S3clientService;
import com.zeco.zecoEats.restaurants.service.OrdersService;
import com.zeco.zecoEats.restaurants.service.RestaurantService;
import com.zeco.zecoEats.restaurants.restaurantDtos.*;
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

@Slf4j
@RestController
@RequestMapping("api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private OrdersService ordersService;

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint(){
        return ResponseEntity.ok( "working");
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
    public ResponseEntity<GetDeliveryFee> getDeliveryFeeForOrdersEndpoint(@RequestParam("customerLongitude") String customerLongitude, @RequestParam("customerLat") String customerLat,
                                                                          @RequestParam List<String> restaurantCoordinates){

        return ResponseEntity.ok( ordersService.calculateDeliveryFee(customerLongitude,customerLat,restaurantCoordinates));
    }

}
