package com.deliveries.service;


import com.deliveries.dtos.OrderCurrentLocationDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DriversDeliveringOrdersLocationSubscriber {

    @Autowired
    private SimpMessagingTemplate template;

    //receive published messages from redis pub sub

    public void handleMessage(OrderCurrentLocationDTO currentLocation){

        System.out.println(currentLocation);
        log.info("**** redis subscriber - received a new message - oder id - {} ****", currentLocation.getOrderID());
        log.info("**** sending message to user - websocket****");

        //send location to user
        template.convertAndSend("/queue/oder/location/"+currentLocation.getOrderID(), currentLocation);
        log.info("**** sent message to user - websocket****");

    }
}
//