package com.deliveries.service.assignDriversToDeliverOrders;

import com.deliveries.dtos.NearbyDriversDTO;
import com.zeco.shared.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class AssignDriver {

    public NearbyDriversDTO assignDriver(DriverAssignmentStrategy strategy, NewOrderShared order , List<Long> blackListedDrivers){
        log.info("**** looking for a driver to deliver order - {} ****", order.getOrderID());
        NearbyDriversDTO nearbyDriver = strategy.assignDriver(order, blackListedDrivers);
        log.info("**** assigned driver to deliver order - {} ****", order.getOrderID());
        return nearbyDriver;
    }
}
