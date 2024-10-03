package com.zeco.zecoEats.deliveries.repository;

import com.zeco.zecoEats.deliveries.model.OrdersReadyForDelivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersReadyForDeliveryRepository extends JpaRepository<OrdersReadyForDelivery, Long> {
}
