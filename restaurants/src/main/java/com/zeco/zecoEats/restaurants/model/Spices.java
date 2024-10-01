package com.zeco.restaurants.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "spices")
public class Spices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spices_id")
    private Long spicesID;

    @Column(name = "spice_name")
    @NonNull
    private String spiceName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dish_id", referencedColumnName = "dish_id")
    @NonNull
    @JsonIgnore
    private Dishes dish;

    @Column(name = "spice_price")
    @NonNull
    @JsonIgnore
    private BigDecimal spicePrice;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Spices spices)) return false;
        return Objects.equals(getSpiceName(), spices.getSpiceName()) && Objects.equals(getDish(), spices.getDish());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSpiceName(), getDish());
    }
}
