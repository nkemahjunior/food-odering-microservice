package com.zeco.restaurants.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import java.time.ZonedDateTime;
import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderID;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", referencedColumnName = "restaurant_id")
    @NonNull
    private Restaurant restaurant;

    @Column(name = "user_id")
    private UUID customer; // user who placed the order


    @Column(name = "special_instructions", columnDefinition = "TEXT")
    private String specialInstructions;

    @Column(name = "estimated_time_to_finish")
    @NonNull
    private Long estimatedTimeToFinish;

    @Column(name = "order_time")
    @NonNull
    private ZonedDateTime orderTime;

    @Column(name = "order_complete")
    @NonNull
    private Boolean orderComplete;

    @Column(name = "delivery_address")
    @NonNull
    private String deliveryAddress;

    @Column(name = "delivery_instructions")
    @NonNull
    private String deliveryInstructions;

    @Column(name = "delivery_latitude")
    private Float deliveryLatitude;

    @Column(name = "delivery_longitude")
    private Float deliveryLongitude;

    @OneToMany(mappedBy = "orderID", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<OrderDishes> orderDishesList = new ArrayList<>();


    //sync method for orderDishesList
    public void addDishesForOrder(OrderDishes orderDish){
        orderDishesList.add(orderDish);
        orderDish.setOrderID(this);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Orders orders)) return false;
        return Objects.equals(getRestaurant(), orders.getRestaurant()) && Objects.equals(getCustomer(), orders.getCustomer()) && Objects.equals(getSpecialInstructions(), orders.getSpecialInstructions()) && Objects.equals(getEstimatedTimeToFinish(), orders.getEstimatedTimeToFinish()) && Objects.equals(getOrderTime(), orders.getOrderTime()) && Objects.equals(getOrderComplete(), orders.getOrderComplete()) && Objects.equals(getDeliveryAddress(), orders.getDeliveryAddress()) && Objects.equals(getDeliveryInstructions(), orders.getDeliveryInstructions()) && Objects.equals(getDeliveryLatitude(), orders.getDeliveryLatitude()) && Objects.equals(getDeliveryLongitude(), orders.getDeliveryLongitude());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRestaurant(), getCustomer(), getSpecialInstructions(), getEstimatedTimeToFinish(), getOrderTime(), getOrderComplete(), getDeliveryAddress(), getDeliveryInstructions(), getDeliveryLatitude(), getDeliveryLongitude());
    }
}
