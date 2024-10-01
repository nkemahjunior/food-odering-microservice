package com.zeco.restaurants.repository;

import com.zeco.restaurants.model.Cuisines;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CuisineRepository extends JpaRepository<Cuisines, Long> {
}
