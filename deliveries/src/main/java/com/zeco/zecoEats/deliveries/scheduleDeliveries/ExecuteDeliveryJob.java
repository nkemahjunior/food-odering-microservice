package com.zeco.zecoEats.deliveries.scheduleDeliveries;

import com.zeco.zecoEats.deliveries.model.OrdersReadyForDelivery;
import com.zeco.zecoEats.deliveries.repository.OrdersReadyForDeliveryRepository;
import com.zeco.zecoEats.deliveries.service.DeliveryDriversService;
import io.github.nkemahjunior.zecoEats.common.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Slf4j
@Component
public class ExecuteDeliveryJob extends QuartzJobBean {

    @Autowired
    private DeliveryDriversService deliveryDriversService;

    @Autowired
    private OrdersReadyForDeliveryRepository ordersReadyForDeliveryRepository;


    /**
     * executes each time the estimated time to prepare an order expires
     */
    @Override
    protected void executeInternal(JobExecutionContext context)  {
        try{

            NewOrderShared order = extractAndBuildAndSave(context.getMergedJobDataMap());
            deliveryDriversService.assignDeliveryDriverToOrder(order);

        }catch (Exception ex){
            log.error("**** error Triggering order for delivery ****");
            log.error(ex.getMessage());
        }
    }


    /**
     *Extracts the properties from the jobDataMap
     * creates an ordersReadyForDelivery object with the properties and save to the database, and once we get a delivery driver, the driver will be assigned to this order
     * creates and return a NewOrderShared object with the properties
     */
    private NewOrderShared extractAndBuildAndSave(JobDataMap jobDataMap){
        // Extracting values from JobDataMap
        long orderId = jobDataMap.getLong("order_id");
        UUID restaurantId = UUID.fromString(jobDataMap.getString("restaurant_id"));
        UUID userId = UUID.fromString(jobDataMap.getString("user_id"));
        long estimatedTimeToFinish = jobDataMap.getLong("estimated_time_to_finish");
        long orderTimeEpoch = jobDataMap.getLong("order_time");
        Instant orderTime = Instant.ofEpochSecond(orderTimeEpoch);
        boolean orderComplete = jobDataMap.getBoolean("order_complete");
        String deliveryAddress = jobDataMap.getString("delivery_address");
        String deliveryInstructions = jobDataMap.getString("delivery_instructions");
        double deliveryLatitude = jobDataMap.getDouble("delivery_latitude");
        double deliveryLongitude = jobDataMap.getDouble("delivery_longitude");
        double restaurantLatitude = jobDataMap.getDouble("restaurant_latitude");
        double restaurantLongitude = jobDataMap.getDouble("restaurant_longitude");

        OrdersReadyForDelivery ordersReadyForDelivery = new OrdersReadyForDelivery();
        ordersReadyForDelivery.setOrderID(orderId); // Assuming this setter exists
        ordersReadyForDelivery.setRestaurantID(restaurantId);
        ordersReadyForDelivery.setUserID(userId);
        ordersReadyForDelivery.setOrderTime(ZonedDateTime.ofInstant(orderTime, ZoneId.systemDefault()));//TODO make an handle this time Zones well'
        ordersReadyForDelivery.setOrderComplete(orderComplete);
        ordersReadyForDelivery.setDeliveryAddress(deliveryAddress);
        ordersReadyForDelivery.setDeliveryInstructions(deliveryInstructions);
        ordersReadyForDelivery.setDeliveryLatitude(deliveryLatitude);
        ordersReadyForDelivery.setDeliveryLongitude(deliveryLongitude);

        //save order, a driver will be assigned to this order, so they can deliver it to its location
        ordersReadyForDeliveryRepository.save(ordersReadyForDelivery);



        return NewOrderShared.builder()
                .orderID(orderId).
                restaurantID(restaurantId).
                userID(userId).
                estimatedTimeToFinish(estimatedTimeToFinish).
                orderTime(ZonedDateTime.ofInstant(orderTime, ZoneId.systemDefault())). //TODO make an handle this time Zones well'
                orderComplete(orderComplete).
                deliveryAddress(deliveryAddress).
                deliveryInstructions(deliveryInstructions).
                deliveryLongitude(deliveryLongitude).
                deliveryLatitude(deliveryLatitude).
                restaurantLongitude(restaurantLongitude).
                restaurantLatitude(restaurantLatitude).
                build();
    }


}
