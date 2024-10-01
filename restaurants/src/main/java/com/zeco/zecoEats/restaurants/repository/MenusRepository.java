package com.zeco.restaurants.repository;

import com.zeco.restaurants.model.Menus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenusRepository extends JpaRepository<Menus, Long> {
}
