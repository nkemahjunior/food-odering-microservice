package com.deliveries.service.assignDriversToDeliverOrders;

import com.deliveries.dtos.NearbyDriversDTO;
import com.deliveries.repository.AvailableDriversRepository;
import com.deliveries.repository.OrdersDriversBlacklistRepository;
import com.zeco.shared.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Slf4j
@Component
public class ClosestDriverStrategy implements DriverAssignmentStrategy{

    @Autowired
    OrdersDriversBlacklistRepository ordersDriversBlacklistRepository;

    @Autowired
    AvailableDriversRepository availableDriversRepository;

    @Override
    public NearbyDriversDTO assignDriver(NewOrderShared order, List<Long> blacklistedDrivers) {

        if(blacklistedDrivers.isEmpty()) blacklistedDrivers = List.of(0L);

        //don't add the blacklisted drivers when searching for different drivers who can deliver the order
        List<NearbyDriversDTO> driversCloseToRestaurant = availableDriversRepository.findDriversCloseToRestaurant(order.getRestaurantLongitude(), order.getRestaurantLatitude(), blacklistedDrivers);
        return driversCloseToRestaurant.get(0); // the closest
    }
}
