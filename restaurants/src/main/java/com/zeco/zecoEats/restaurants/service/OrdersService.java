package com.zeco.zecoEats.restaurants.service;


import com.zeco.zecoEats.restaurants.repository.OrdersRepository;
import com.zeco.zecoEats.restaurants.service.deliveryFeeStrategies.DeliveryFeeStrategyFactory;
import com.zeco.zecoEats.restaurants.service.placeOrderTemplate.PlaceOrderTemplate;
import com.zeco.zecoEats.restaurants.restaurantDtos.GetDeliveryFee;
import com.zeco.zecoEats.restaurants.restaurantDtos.PlaceOrderDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class OrdersService {

    @Autowired
    PlaceOrderTemplate placeOrderTemplate;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private DeliveryFeeStrategyFactory deliveryFeeStrategyFactory;


    @CacheEvict(value = "orders", allEntries = true)
    public void placeOrder(List<PlaceOrderDTO> placeOrderDTO) {
        placeOrderTemplate.placeOrder(placeOrderDTO, ordersRepository);
    }

    @Cacheable(value = "deliveryFee", key = "#customerLongitude + '-' + #customerLat + '-' + #restaurantCoordinates.hashCode()")
    public GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates) {
        return deliveryFeeStrategyFactory.calculateDeliveryFee(customerLongitude, customerLat, restaurantCoordinates);
    }


}
