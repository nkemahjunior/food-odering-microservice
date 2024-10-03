package com.zeco.zecoEats.restaurants.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Getter
@Setter
@Entity
@Table(name = "menus")
public class Menus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long menuID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "restaurant_id")
    @NonNull
    private Restaurant restaurantID;

    @Column(name = "menu_name")
    @NonNull
    private String menuName;

    @OneToMany(mappedBy = "menu", fetch = FetchType.LAZY)
    List<Dishes> dishesList = new ArrayList<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Menus menus)) return false;
        return Objects.equals(getRestaurantID(), menus.getRestaurantID()) && Objects.equals(getMenuName(), menus.getMenuName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRestaurantID(), getMenuName());
    }
}
