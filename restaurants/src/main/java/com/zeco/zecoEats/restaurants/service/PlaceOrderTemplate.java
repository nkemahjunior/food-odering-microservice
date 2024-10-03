package com.zeco.restaurants.service;

import com.zeco.restaurants.model.OrderDishes;
import com.zeco.restaurants.model.Orders;
import com.zeco.restaurants.model.Restaurant;
import com.zeco.restaurants.repository.OrdersRepository;
import com.zeco.restaurants.repository.RestaurantRepository;
import com.zeco.restaurants.restaurantDtos.GetUserResponseDTO;
import com.zeco.restaurants.restaurantDtos.PlaceOrderDTO;
import com.zeco.shared.NewOrderShared;

import java.util.List;
import java.util.UUID;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Supplier;

public abstract class PlaceOrderTemplate {


    abstract GetUserResponseDTO getUser(UUID userID);
    abstract Restaurant getRestaurant(UUID restaurantID);
    abstract Orders createOrderObject();
    abstract Orders setOrderDetails(Supplier<Orders> getOrderObject, PlaceOrderDTO oderPlaced, Restaurant restaurant, UUID userID);
    abstract  Orders addDishesForOrder(PlaceOrderDTO oderPlaced, BiConsumer<List<Long>,OrderDishes> spicesForDish, Supplier<Orders> order);
    abstract  void addSpicesForTheDish( List<Long> spiceIDs, OrderDishes orderDish);
    abstract NewOrderShared changeOrderObjectType(Orders savedOrder, Restaurant restaurant);
    abstract void notifyDelivery(NewOrderShared newOrderShared, UUID key);



    //user can place multiple orders from different restaurants
    public final void placeOrder(List<PlaceOrderDTO> placeOrderReq, OrdersRepository ordersRepository){

        // no matter the number of orders, It's still the same user, so take the user id from one of the orders
        GetUserResponseDTO user = getUser(placeOrderReq.get(0).user_id());
        UUID key = UUID.randomUUID();

        //user can place multiple orders from different restaurants
        for(PlaceOrderDTO orderPlaced: placeOrderReq){
            Restaurant restaurant = getRestaurant(orderPlaced.restaurantID());

            // user might order more than one DISH from the same restaurant in the same order
            Orders order = addDishesForOrder(orderPlaced,
                    (spices, oderDish) -> addSpicesForTheDish(spices, oderDish),
                    () -> setOrderDetails(this::createOrderObject, orderPlaced, restaurant, user.getUserID())
            );

            ordersRepository.save(order);
            NewOrderShared newOrderShared = changeOrderObjectType(order, restaurant);
            notifyDelivery(newOrderShared, key);
        }
    }

}
