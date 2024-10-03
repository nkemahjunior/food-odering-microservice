package com.zeco.restaurants.service;

import com.zeco.restaurants.httpCalls.UserServiceClient;
import com.zeco.restaurants.model.*;
import com.zeco.restaurants.repository.DishesRepository;
import com.zeco.restaurants.repository.OrdersRepository;
import com.zeco.restaurants.repository.RestaurantRepository;
import com.zeco.restaurants.repository.SpicesRepository;
import com.zeco.restaurants.restaurantDtos.GetUserResponseDTO;
import com.zeco.restaurants.restaurantDtos.OrderDishAndSpice;
import com.zeco.restaurants.restaurantDtos.PlaceOrderDTO;
import com.zeco.shared.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Slf4j
@Component
public class PlaceOrder extends PlaceOrderTemplate{

    @Autowired
    private KafkaTemplate<String, NewOrderShared> kafkaTemplate;

    @Value("${topics.new-order}")
    private String newOrderTopic;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    DishesRepository dishesRepository;

    @Autowired
    SpicesRepository spicesRepository;

    @Override
    GetUserResponseDTO getUser(UUID userID) {
        GetUserResponseDTO user = userServiceClient.getUser(userID);
        if(user == null) throw new RuntimeException(" user not found");
        return user;
    }

    @Override
    Restaurant getRestaurant(UUID restaurantID) {
        return restaurantRepository.findById(restaurantID).
                orElseThrow(() -> new NoSuchElementException("restaurant not found, can not place order"));
    }

    @Override
    Orders createOrderObject() {
        return new Orders();
    }

    @Override
    Orders setOrderDetails(Supplier<Orders> getOrderObject, PlaceOrderDTO orderPlaced, Restaurant restaurant, UUID userID) {
        Orders order = getOrderObject.get();
        order.setRestaurant(restaurant);
        order.setCustomer(userID);
        order.setSpecialInstructions(orderPlaced.specialInstructions());
        order.setEstimatedTimeToFinish(orderPlaced.estimatedTimeToFinish());
        order.setOrderTime(orderPlaced.orderTime());
        order.setOrderComplete(false);
        order.setDeliveryAddress(orderPlaced.deliveryAddress()); // why are you not taking the user address from the user( which you got from the user service) above? maybe customer can change their delivery location when ordering e.g. like to their office
        order.setDeliveryInstructions(orderPlaced.deliveryInstructions());
        order.setDeliveryLatitude(orderPlaced.deliveryLatitude());
        order.setDeliveryLongitude(orderPlaced.deliveryLongitude());

        return order;
    }


    @Override
    Orders addDishesForOrder(PlaceOrderDTO oderPlaced, BiConsumer<List<Long>, OrderDishes> spicesForDish, Supplier<Orders> orderSp) {
        Orders order = orderSp.get();

        for(OrderDishAndSpice dishOrdered : oderPlaced.dishAndSpices()){
            OrderDishes orderDish = new OrderDishes();
            Dishes dish = dishesRepository.findById(dishOrdered.getDishID()).orElseThrow(() -> new NoSuchElementException("dish not found - "));
            //setting only the dishID field of orderDish, the  order.addDishesForOrder(orderDish); will take care of setting the orderID field
            orderDish.setDishID(dish);
            //add spices for this dish
            spicesForDish.accept(dishOrdered.getSpiceIDs(), orderDish);
            // add this dish to the order
            order.addDishesForOrder(orderDish);
        }
        return order;
    }


    @Override
    void addSpicesForTheDish(List<Long> spiceIDs, OrderDishes orderDish) {
        if(spiceIDs == null) return;

        spiceIDs.forEach( spiceForDish -> {
            OrdersDishSpices ordersDishSpice = new OrdersDishSpices();

            Spices spice = spicesRepository.findById(spiceForDish).orElseThrow(() -> new NoSuchElementException(" spice requested for dish not found -"));
            //setting only the spiceID field of ordersDishSpice, the   orderDish.addSpicesForAOrderDish(ordersDishSpice); will take care of setting the orderDishID field
            ordersDishSpice.setSpiceID(spice);
            orderDish.addSpicesForAOrderDish(ordersDishSpice);
        });
    }

    @Override
    NewOrderShared changeOrderObjectType(Orders savedOrder, Restaurant restaurant) {
       return NewOrderShared.builder().
                orderID(savedOrder.getOrderID()).
                restaurantID(savedOrder.getRestaurant().getRestaurantID()).
                userID(savedOrder.getCustomer()).
                estimatedTimeToFinish(savedOrder.getEstimatedTimeToFinish()).
                orderTime(savedOrder.getOrderTime()).
                orderComplete(savedOrder.getOrderComplete()).
                deliveryAddress(savedOrder.getDeliveryAddress()).
                deliveryInstructions(savedOrder.getDeliveryInstructions()).
                deliveryLatitude(savedOrder.getDeliveryLatitude()).
                deliveryLongitude(savedOrder.getDeliveryLongitude()).
                restaurantLongitude(restaurant.getLongitude()).
                restaurantLatitude(restaurant.getLatitude()).
                build();
    }

    @Override
    void notifyDelivery(NewOrderShared newOrderShared, UUID key) {
        //send all the user's orders on the same partition, so use a key
        kafkaTemplate.send(newOrderTopic, key.toString(), newOrderShared);
    }


}
