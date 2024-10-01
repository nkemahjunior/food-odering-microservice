package com.zeco.zecoEats.deliveries.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "available_drivers")
public class AvailableDrivers {

    @Id
    @Column(name = "avl_driver_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long avlDriverID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", referencedColumnName = "driver_id")
    private DeliveryDrivers driverID;

    @Column(name = "coordinates")
    @NonNull
    private Point driverCoordinates;

    @Column(name = "heart_beat")
    @NonNull
    private LocalDateTime heartBeat;

    @Column(name = "online")
    @NonNull
    private Boolean online;

    @Column(name = "fcm_registration_token")
    @NonNull
    private String fcmRegistrationToken;

    //@Column(name = "distance")
    private Double distance; //this column will be added to the table if you run a query containing stDistance()


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AvailableDrivers that)) return false;
        return Objects.equals(getDriverID(), that.getDriverID()) && Objects.equals(getDriverCoordinates(), that.getDriverCoordinates()) && Objects.equals(getHeartBeat(), that.getHeartBeat()) && Objects.equals(getFcmRegistrationToken(), that.getFcmRegistrationToken());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getDriverID(), getDriverCoordinates(), getHeartBeat(), getFcmRegistrationToken());
    }

    @Override
    public String toString() {
        return "AvailableDrivers{" +
                "avlDriverID=" + avlDriverID +
                ", driverID=" + driverID.getDriverID() +
                ", driverCoordinates=" + driverCoordinates +
                ", heartBeat=" + heartBeat +
                ", fcmRegistrationToken='" + fcmRegistrationToken +
                ", distance='" + distance + '\'' +
                '}';
    }
}
