package com.zeco.zecoEats.restaurants.repository;

import com.zeco.zecoEats.restaurants.model.Cuisines;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CuisineRepository extends JpaRepository<Cuisines, Long> {
}
