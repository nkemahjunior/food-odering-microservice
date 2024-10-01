package com.zeco.zecoEats.restaurants.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "orders_dish_spices")
public class OrdersDishSpices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_spices_id")
    private Long orderDishSpicesID;

    @ManyToOne //uni directional
    @JoinColumn(name = "spice_id", referencedColumnName = "spices_id")
    private Spices spiceID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrdersDishSpices that)) return false;
        return Objects.equals(getSpiceID(), that.getSpiceID()) && Objects.equals(getOrderDishID(), that.getOrderDishID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSpiceID(), getOrderDishID());
    }

    @ManyToOne(fetch = FetchType.LAZY) //bi directional
    @JoinColumn(name = "orders_dish_id", referencedColumnName = "orders_dishes_id")
    private OrderDishes orderDishID;
}
