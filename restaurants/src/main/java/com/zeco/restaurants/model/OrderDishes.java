package com.zeco.restaurants.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name =  "orders_dishes")
public class OrderDishes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_dishes_id")
    private Long orderDishesID;

    @ManyToOne(fetch = FetchType.LAZY)// bi directional
    @JoinColumn(name = "order_id", referencedColumnName = "order_id" )
    private  Orders orderID;

    @ManyToOne //uni directional
    @JoinColumn(name = "dish_id", referencedColumnName = "dish_id")
    private Dishes dishID;

    @OneToMany(mappedBy = "orderDishID", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<OrdersDishSpices> ordersDishSpicesList = new ArrayList<>();

    //sync method for ordersDishSpicesList
    public void addSpicesForAOrderDish(OrdersDishSpices ordersDishSpice){
        ordersDishSpicesList.add(ordersDishSpice);
        ordersDishSpice.setOrderDishID(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderDishes that)) return false;
        return Objects.equals(getOrderID(), that.getOrderID()) && Objects.equals(getDishID(), that.getDishID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrderID(), getDishID());
    }
}
