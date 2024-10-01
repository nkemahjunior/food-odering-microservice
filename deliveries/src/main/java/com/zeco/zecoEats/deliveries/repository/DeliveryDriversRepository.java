package com.deliveries.repository;

import com.deliveries.model.DeliveryDrivers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryDriversRepository extends JpaRepository<DeliveryDrivers, Long> {
}
