package com.deliveries.service;

import com.deliveries.dtos.CreateDeliveryDriverDto;
import com.deliveries.dtos.GetUserResponseDTO;
import com.deliveries.httpCall.UserServiceClient;
import com.deliveries.model.DeliveryDrivers;
import com.deliveries.repository.DeliveryDriversRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Slf4j
@Service
public class DeliveryDriversService {

    @Autowired
    private DeliveryDriversRepository deliveryDriversRepository;

    @Autowired
    private UserServiceClient userServiceClient;

    /**
     *
     * register a new delivery driver, only if they already have a user account( by signing up)
     */
    public void saveNewDeliveryDriver(CreateDeliveryDriverDto createDeliveryDriverDto){
        log.info("**** verifying the user's id - {} ****", createDeliveryDriverDto.userID());
        GetUserResponseDTO user =  userServiceClient.getUser(createDeliveryDriverDto.userID());
        if(user == null) throw new NoSuchElementException("user not found, create an account first");
        log.info("**** valid user id - {} ****", createDeliveryDriverDto.userID());


        DeliveryDrivers drivers = new DeliveryDrivers();
        drivers.setUserID(user.getUserID());
        drivers.setVehicleType(createDeliveryDriverDto.vehicleType());

        deliveryDriversRepository.save(drivers);
        log.info("**** saved the user's id - {} ****", createDeliveryDriverDto.userID());
    }



    public void notifyAvailable(){

    }
}
