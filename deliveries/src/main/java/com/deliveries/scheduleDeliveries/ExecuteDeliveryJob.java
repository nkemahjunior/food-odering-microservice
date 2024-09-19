package com.deliveries.scheduleDeliveries;

import com.deliveries.service.DeliveryDriversService;
import com.zeco.shared.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.UUID;

@Slf4j
@Component
public class ExecuteDeliveryJob extends QuartzJobBean {

    @Autowired
    private DeliveryDriversService deliveryDriversService;



    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        try{

            NewOrderShared order = extractAndBuild(context.getMergedJobDataMap());
            deliveryDriversService.getDeliveryDriver(order);

        }catch (Exception ex){
            log.error("**** error Triggering order for delivery ****");
            log.error(ex.getMessage());
        }
    }


    private NewOrderShared extractAndBuild(JobDataMap jobDataMap){
        // Extracting values from JobDataMap
        long orderId = jobDataMap.getLong("order_id");
        UUID restaurantId = UUID.fromString(jobDataMap.getString("restaurant_id"));
        UUID userId = UUID.fromString("user_id");
        long estimatedTimeToFinish = jobDataMap.getInt("estimated_time_to_finish");
        long orderTimeEpoch = jobDataMap.getLong("order_time");
        Instant orderTime = Instant.ofEpochSecond(orderTimeEpoch);
        boolean orderComplete = jobDataMap.getBoolean("order_complete");
        String deliveryAddress = jobDataMap.getString("delivery_address");
        String deliveryInstructions = jobDataMap.getString("delivery_instructions");
        float deliveryLatitude = jobDataMap.getFloat("delivery_latitude");
        float deliveryLongitude = jobDataMap.getFloat("delivery_longitude");
        float restaurantLatitude = jobDataMap.getFloat("restaurant_latitude");
        float restaurantLongitude = jobDataMap.getFloat("restaurant_longitude");

        return NewOrderShared.builder()
                .orderID(orderId).
                restaurantID(restaurantId).
                userID(userId).
                estimatedTimeToFinish(estimatedTimeToFinish).
                orderTime(ZonedDateTime.from(orderTime)).
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
