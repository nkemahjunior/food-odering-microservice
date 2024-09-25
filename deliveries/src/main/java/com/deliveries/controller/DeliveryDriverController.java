package com.deliveries.controller;


import com.deliveries.dtos.AcceptOrDeclineDeliveryDTO;
import com.deliveries.dtos.AddAvailableDriverDTO;
import com.deliveries.dtos.CreateDeliveryDriverDto;
import com.deliveries.dtos.UpdateDriverLocationDTO;
import com.deliveries.service.DeliveryDriversService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/deliveries")
public class DeliveryDriverController {

    @Autowired
    RedisTemplate<String, String> redisTemplate;

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

    @PostMapping("/driver/acceptDelivery")
    public ResponseEntity<Void> acceptToDeliverOrderEndpoint(@RequestBody AcceptOrDeclineDeliveryDTO acceptDeliveryDTO){
        deliveryDriversService.acceptToDeliverOrder(acceptDeliveryDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/driver/declineDelivery")
    public ResponseEntity<Void> declineToDeliverOrderEndpoint(@RequestBody AcceptOrDeclineDeliveryDTO denyDeliveryDTO){
        deliveryDriversService.declineToDeliverOrder(denyDeliveryDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

  /*  @GetMapping("/test")
    public void test(){
        deliveryDriversService.test();
    }

*/


    @GetMapping("/test-put/{key}/{data}")
    public void testPut(@PathVariable String key,@PathVariable String data){
        redisTemplate.opsForValue().set(key, data);
    }

    @GetMapping("/test-get/{key}")
    public String testGet(@PathVariable String key){
        return redisTemplate.opsForValue().get(key);
    }
}
