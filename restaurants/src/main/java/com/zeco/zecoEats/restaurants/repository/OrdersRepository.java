package com.zeco.restaurants.repository;

import com.zeco.restaurants.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
}
