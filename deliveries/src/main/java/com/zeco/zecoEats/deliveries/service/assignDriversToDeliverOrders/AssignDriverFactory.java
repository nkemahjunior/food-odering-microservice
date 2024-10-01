package com.zeco.zecoEats.deliveries.service.assignDriversToDeliverOrders;

import com.zeco.zecoEats.deliveries.dtos.NearbyDriversDTO;
import com.zeco.zecoEats.common.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class AssignDriverFactory {

    public static DriverAssignmentStrategy getSearchStrategy(AssignmentType type){
        switch (type){
            case CLOSEST_DRIVER:
                return new ClosestDriverStrategy();
            default:
                throw new IllegalArgumentException("Unknown driver type: " + type);
        }
    }

    public NearbyDriversDTO assignDriver(AssignmentType type, NewOrderShared order , List<Long> blackListedDrivers){
        DriverAssignmentStrategy strategy = AssignDriverFactory.getSearchStrategy(type);
        return strategy.assignDriver(order, blackListedDrivers);
    }



}
