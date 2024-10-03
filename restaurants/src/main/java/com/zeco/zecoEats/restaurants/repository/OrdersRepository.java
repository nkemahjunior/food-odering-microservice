package com.zeco.zecoEats.restaurants.repository;

import com.zeco.zecoEats.restaurants.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
}
