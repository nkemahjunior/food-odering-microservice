package com.zeco.restaurants.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Array;
import org.hibernate.annotations.Cascade;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Getter
@Setter
@Entity
@Table(name = "cuisines")
public class Cuisines {





    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cuisine_id")
    private Long cuisineID;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "cuisinesSet")
    private Set<Restaurant> restaurantsSet = new HashSet<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cuisines cuisines)) return false;
        return Objects.equals(getName(), cuisines.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }


}
