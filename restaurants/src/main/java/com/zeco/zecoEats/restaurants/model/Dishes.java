package com.zeco.zecoEats.restaurants.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Getter
@Setter
@Entity
@Table(name = "dishes")
public class Dishes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dish_id")
    private Long dishID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    @NonNull
    private Menus menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    @NonNull
    private  Restaurant restaurant;


    @Column(name = "cooking_time")
    @NonNull
    private String cookingTime;

    @Column(name = "description")
    @NonNull
    private String description;

    @Column(name = "price")
    @NonNull
    private BigDecimal price;

    @Column(name = "discount")
    private Boolean discount;

    @Column(name = "discountPrice")
    private Long discountPrice;

    @Column(name = "likes")
    @NonNull
    private Long likes;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "dish", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Spices> spicesList = new ArrayList<>();

  /*  @OneToMany(mappedBy = "dish", orphanRemoval = true)
    private List<Orders> ordersList = new ArrayList<>();*/


    //sync method for spicesList
    public void addSpices(Spices spices){
        spicesList.add(spices);
        spices.setDish(this);//synchronizing
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Dishes dishes)) return false;
        return Objects.equals(getMenu(), dishes.getMenu()) && Objects.equals(getCookingTime(), dishes.getCookingTime()) && Objects.equals(getDescription(), dishes.getDescription()) && Objects.equals(getPrice(), dishes.getPrice()) && Objects.equals(getDiscount(), dishes.getDiscount()) && Objects.equals(getDiscountPrice(), dishes.getDiscountPrice()) && Objects.equals(getLikes(), dishes.getLikes()) && Objects.equals(getImageUrl(), dishes.getImageUrl());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMenu(), getCookingTime(), getDescription(), getPrice(), getDiscount(), getDiscountPrice(), getLikes(), getImageUrl());
    }
}

