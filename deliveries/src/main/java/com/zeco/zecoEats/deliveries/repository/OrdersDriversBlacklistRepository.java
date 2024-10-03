package com.zeco.zecoEats.deliveries.repository;

import com.zeco.zecoEats.deliveries.model.OrdersDriverBlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersDriversBlacklistRepository extends JpaRepository<OrdersDriverBlackList, Long> {

    @Query("SELECT o.driverID FROM OrdersDriverBlackList o WHERE o.order.orderID = ?1")
    List<Long> findAllBlacklistedDriverIdsForThisOrder(Long orderID);
}
