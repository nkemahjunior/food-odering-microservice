package com.zeco.zecoEats.deliveries.service.assignDriversToDeliverOrders;

import com.zeco.zecoEats.deliveries.dtos.NearbyDriversDTO;
import io.github.nkemahjunior.zecoEats.common.NewOrderShared;

import java.util.List;

public interface DriverAssignmentStrategy {
    NearbyDriversDTO assignDriver(NewOrderShared order, List<Long> blacklistedDrivers);
}
