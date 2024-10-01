package com.zeco.restaurants.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Objects;


@Getter
@Setter
@Entity
@Table(name = "restaurant_operational_times")
public class RestaurantOperationalTimes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "opening_day")
    private String openingDay;

    @Column(name = "opening_time")
    private LocalTime openingTime;

    @Column(name = "closing_day")
    private String closingDay;

    @Column(name = "closing_time")
    private LocalTime closingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "restaurant_id")
    @JsonIgnore
    private Restaurant restaurantID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RestaurantOperationalTimes that)) return false;
        return Objects.equals(getOpeningDay(), that.getOpeningDay()) && Objects.equals(getOpeningTime(), that.getOpeningTime()) && Objects.equals(getClosingDay(), that.getClosingDay()) && Objects.equals(getClosingTime(), that.getClosingTime()) && Objects.equals(getRestaurantID(), that.getRestaurantID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOpeningDay(), getOpeningTime(), getClosingDay(), getClosingTime(), getRestaurantID());
    }


}
