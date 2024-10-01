package com.zeco.zecoEats.deliveries.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "orders_ready_for_delivery")
public class OrdersReadyForDelivery {

    @Id
    @Column(name = "order_id")
    @NonNull
    private Long orderID;

    @Column(name = "restaurant_id")
    @NonNull
    private UUID restaurantID;

    @Column(name = "user_id")
    @NonNull
    private UUID userID;

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
    private String deliveryInstructions;

    @Column(name = "delivery_latitude")
    @NonNull
    private Double deliveryLatitude;

    @Column(name = "delivery_longitude")
    @NonNull
    private Double deliveryLongitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_driver_id", referencedColumnName = "driver_id")
    private DeliveryDrivers deliveryDriver;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrdersReadyForDelivery that)) return false;
        return Objects.equals(getOrderID(), that.getOrderID()) && Objects.equals(getRestaurantID(), that.getRestaurantID()) && Objects.equals(getUserID(), that.getUserID()) && Objects.equals(getOrderTime(), that.getOrderTime()) && Objects.equals(getOrderComplete(), that.getOrderComplete()) && Objects.equals(getDeliveryAddress(), that.getDeliveryAddress()) && Objects.equals(getDeliveryInstructions(), that.getDeliveryInstructions()) && Objects.equals(getDeliveryLatitude(), that.getDeliveryLatitude()) && Objects.equals(getDeliveryLongitude(), that.getDeliveryLongitude()) && Objects.equals(getDeliveryDriver(), that.getDeliveryDriver());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrderID(), getRestaurantID(), getUserID(), getOrderTime(), getOrderComplete(), getDeliveryAddress(), getDeliveryInstructions(), getDeliveryLatitude(), getDeliveryLongitude(), getDeliveryDriver());
    }
}
