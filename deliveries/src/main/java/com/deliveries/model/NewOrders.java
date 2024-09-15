package com.deliveries.model;

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
@Table(name = "new_orders")
public class NewOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "new_order_id")
    private Long newOrderId;

    @Column(name = "order_id")
    @NonNull
    private Long orderId;

    @Column(name = "restaurant_id")
    @NonNull
    private UUID restaurantId;

    @Column(name = "user_id")
    @NonNull
    private UUID userId;


    @Column(name = "estimated_time_to_finish")
    @NonNull
    private Long estimatedTimeToFinish;

    @Column(name = "order_time")
    @NonNull
    private ZonedDateTime orderTime;

    @Column(name = "order_complete")
    @NonNull
    private Boolean orderComplete;

    @Column(name = "delivery_address", length = 255)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NewOrders newOrders)) return false;
        return Objects.equals(getOrderId(), newOrders.getOrderId()) && Objects.equals(getRestaurantId(), newOrders.getRestaurantId()) && Objects.equals(getUserId(), newOrders.getUserId()) && Objects.equals(getEstimatedTimeToFinish(), newOrders.getEstimatedTimeToFinish()) && Objects.equals(getOrderTime(), newOrders.getOrderTime()) && Objects.equals(getOrderComplete(), newOrders.getOrderComplete()) && Objects.equals(getDeliveryAddress(), newOrders.getDeliveryAddress()) && Objects.equals(getDeliveryInstructions(), newOrders.getDeliveryInstructions()) && Objects.equals(getDeliveryLatitude(), newOrders.getDeliveryLatitude()) && Objects.equals(getDeliveryLongitude(), newOrders.getDeliveryLongitude());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrderId(), getRestaurantId(), getUserId(), getEstimatedTimeToFinish(), getOrderTime(), getOrderComplete(), getDeliveryAddress(), getDeliveryInstructions(), getDeliveryLatitude(), getDeliveryLongitude());
    }
}