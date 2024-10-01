package com.deliveries.repository;

import com.deliveries.model.OrdersReadyForDelivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersReadyForDeliveryRepository extends JpaRepository<OrdersReadyForDelivery, Long> {
}
