package com.deliveries.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "orders_drivers_blacklist")
public class OrdersDriverBlackList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_drivers_blacklist_id")
    private Long ordersDriversBlacklistID;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private OrdersReadyForDelivery order;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", referencedColumnName = "driver_id")
    private DeliveryDrivers driverID;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrdersDriverBlackList that)) return false;
        return Objects.equals(getOrder(), that.getOrder()) && Objects.equals(getDriverID(), that.getDriverID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOrder(), getDriverID());
    }
}
