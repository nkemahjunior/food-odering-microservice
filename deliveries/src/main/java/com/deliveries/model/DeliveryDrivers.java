package com.deliveries.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "delivery_drivers")
public class DeliveryDrivers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Long driverID;

    @Column(name = "user_id")
    @NonNull
    private UUID userID;

    @Column(name = "vehicle_type")
    @NonNull
    private String vehicleType;


    @Column(name = "ratings")
    @NonNull
    private Long ratings;

    @OneToOne(mappedBy = "driverID", fetch = FetchType.LAZY)
    @JsonIgnore
    private AvailableDrivers driver;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DeliveryDrivers that)) return false;
        return Objects.equals(getUserID(), that.getUserID()) && Objects.equals(getVehicleType(), that.getVehicleType()) && Objects.equals(getRatings(), that.getRatings());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserID(), getVehicleType(), getRatings());
    }
}
