package com.zeco.zecoEats.restaurants.repository;

import com.zeco.zecoEats.restaurants.model.Dishes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishesRepository extends JpaRepository<Dishes, Long> {
}
