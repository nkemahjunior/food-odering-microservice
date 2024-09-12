package com.zeco.restaurants.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.*;
import java.util.List;


@Slf4j
@Getter
@Setter
@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    //@GeneratedValue(strategy = GenerationType.UUID) I will handle you my self because i want to use this id to create the hashcode
    @Column(name = "restaurant_id")
    @NonNull
    private UUID restaurantID;

    @Column(name = "user_id")
    @NonNull
    private UUID userID;

    @Column(name = "postcode")
    @NonNull
    private String postCode;

    @Column(name = "location")
    @NonNull
    private String location;

    @Column(name = "address")
    @NonNull
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "branding")
    private String branding;

    @Column(name = "restaurant_type")
    //@NonNull
    private String restaurantType;

    @Column(name = "restaurant_name")
    @NonNull
    private String restaurantName;


    @Column(name = "longitude")
    @NonNull
    private Float longitude;

    @Column(name = "latitude")
    @NonNull
    private Float latitude;

    @Column(name = "min_price_per_order")
    private BigDecimal minPricePerOrder;

    @Column(name = "max_price_per_order")
    private BigDecimal maxPricePerOrder;

    @OneToMany(orphanRemoval = true, cascade = {CascadeType.REMOVE, CascadeType.MERGE}, mappedBy = "restaurant")
    List<Dishes> dishes = new ArrayList<>();

    @OneToMany(mappedBy = "restaurantID", cascade = CascadeType.ALL, orphanRemoval = true)
    List<RestaurantOperationalTimes> operationalTimes = new ArrayList<>();


    @ManyToMany
    @JoinTable(
            name = "restaurant_cuisines",
            joinColumns = @JoinColumn(name = "restau_id"),
            inverseJoinColumns = @JoinColumn(name = "cuisine_id")
    )
    private Set<Cuisines> cuisinesSet = new HashSet<>();

    @OneToMany(cascade = {CascadeType.REMOVE, CascadeType.MERGE},mappedBy = "restaurantID", orphanRemoval = true)
    List<Menus> restaurantMenus =  new ArrayList<>();


    //sync method for operational times
    public void addOperationalTimes(RestaurantOperationalTimes times){
        log.info("****adding and synchronizing operational time - {}****", times.getOpeningDay());
        operationalTimes.add(times);
        times.setRestaurantID(this); //synchronizing
        log.info("****finished adding and synchronizing operational time - {}****", times.getOpeningTime());
    }

    //sync method for cuisineSet
    public void addCousines(Cuisines cuisine){
        log.info("****adding and synchronizing cusine - {}****", cuisine.getCuisineID());
        cuisinesSet.add(cuisine);
        cuisine.getRestaurantsSet().add(this);//synchronizing
        log.info("****finished adding and synchronizing cusine - {}****", cuisine.getCuisineID());
    }





    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Restaurant that)) return false;
        return Objects.equals(getRestaurantID(), that.getRestaurantID());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRestaurantID());
    }


}
