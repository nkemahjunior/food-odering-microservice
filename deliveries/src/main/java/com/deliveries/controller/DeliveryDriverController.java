package com.deliveries.controller;


import com.deliveries.dtos.CreateDeliveryDriverDto;
import com.deliveries.service.DeliveryDriversService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/deliveries")
public class DeliveryDriverController {

    @Autowired
    private DeliveryDriversService deliveryDriversService;

    @PostMapping("/new")
    public ResponseEntity<Void> createNewDriverEndpoint(@RequestBody CreateDeliveryDriverDto createDeliveryDriverDto){
        deliveryDriversService.saveNewDeliveryDriver(createDeliveryDriverDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
