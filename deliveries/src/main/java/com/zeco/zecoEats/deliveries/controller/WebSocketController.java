package com.zeco.zecoEats.deliveries.controller;

import com.zeco.zecoEats.deliveries.dtos.OrderCurrentLocationDTO;
import com.zeco.zecoEats.deliveries.service.DriversDeliveringOrdersLocationSubscriber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;

import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class WebSocketController {


    @Value("${topics.drivers-delivering-order-location}")
    private String driversDeliveringAnOrderTopic;

    @Autowired
    DriversDeliveringOrdersLocationSubscriber driversDeliveringOrdersLocationSubscriber;

    @Autowired
    RedisTemplate<String, OrderCurrentLocationDTO> redisTemplate;

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @MessageMapping("/driver/location/*")
    public void  receiveDriverCoordinatesEndpoint(@Payload OrderCurrentLocationDTO orderCurrentLocationDTO){
        System.out.println(orderCurrentLocationDTO);
        log.info("**** receive new coordinates from driver with order -{} - websocket****", orderCurrentLocationDTO.getOrderID());
        log.info("**** publishing message to all instances of the delivery service subscribed to topic - {} - redis pub****", driversDeliveringAnOrderTopic);

        //publish location to all instances of this service
        //the subscriber class will receive the message in the handleMessage method of the DriversDeliveringOrdersLocationSubscriber class( in service package) and send to the user
        redisTemplate.convertAndSend(driversDeliveringAnOrderTopic, orderCurrentLocationDTO);
        log.info("**** published message to all instances of the delivery service - redis pub****");

    }
}
