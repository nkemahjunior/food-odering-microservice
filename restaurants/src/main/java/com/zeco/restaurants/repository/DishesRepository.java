package com.zeco.restaurants.repository;

import com.zeco.restaurants.model.Dishes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishesRepository extends JpaRepository<Dishes, Long> {
}
