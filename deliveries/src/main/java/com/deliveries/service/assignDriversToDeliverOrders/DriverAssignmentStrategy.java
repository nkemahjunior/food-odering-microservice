package com.deliveries.service.assignDriversToDeliverOrders;

import com.deliveries.dtos.NearbyDriversDTO;
import com.zeco.shared.NewOrderShared;

import java.util.List;

public interface DriverAssignmentStrategy {
    NearbyDriversDTO assignDriver(NewOrderShared order, List<Long> blacklistedDrivers);
}
