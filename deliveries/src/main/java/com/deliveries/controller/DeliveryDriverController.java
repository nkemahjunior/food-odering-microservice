package com.deliveries.controller;


import com.deliveries.dtos.AddAvailableDriverDTO;
import com.deliveries.dtos.CreateDeliveryDriverDto;
import com.deliveries.model.UpdateDriverLocationDTO;
import com.deliveries.service.DeliveryDriversService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/deliveries")
public class DeliveryDriverController {

    @Autowired
    private DeliveryDriversService deliveryDriversService;

    @PostMapping("/newDriver")
    public ResponseEntity<Void> createNewDriverEndpoint(@RequestBody CreateDeliveryDriverDto createDeliveryDriverDto){
        deliveryDriversService.saveNewDeliveryDriver(createDeliveryDriverDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/driver/available")
    public ResponseEntity<Void> addDriverAvailableForWorkEndpoint(@RequestBody AddAvailableDriverDTO addAvailableDriverDTO){
        deliveryDriversService.addDriverAvailableForWork(addAvailableDriverDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/driver/updateLocation")
    public ResponseEntity<Void> updateDriversLocationEndpoint(@RequestBody UpdateDriverLocationDTO updateDriverLocationDTO){
        deliveryDriversService.updateDriverLocationAndHeartBeat(updateDriverLocationDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

  /*  @GetMapping("/test")
    public void test(){
        deliveryDriversService.getDeliveryDriver();
    }*/

}
