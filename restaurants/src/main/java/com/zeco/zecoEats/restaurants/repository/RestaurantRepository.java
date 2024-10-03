package com.zeco.zecoEats.restaurants.repository;

import com.zeco.zecoEats.restaurants.model.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface RestaurantRepository extends JpaRepository<Restaurant, UUID> {

    Page<Restaurant> findByLocation(String location, Pageable pageable);
    //List<Restaurant> findByLocation(String location);
}
