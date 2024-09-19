package com.deliveries.scheduleDeliveries;

import com.zeco.shared.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

import static org.quartz.JobBuilder.newJob;

@Slf4j
@Service
public class ScheduleOrderDelivery {

    @Autowired
    private Scheduler scheduler;

    public void scheduleDelivery(NewOrderShared order)  {
        try{
            log.info("**** scheduling a new order - {} for delivery ****", order.getOrderID());

            JobDetail jobDetail = newJob(ExecuteDeliveryJob.class)
                    .withIdentity("orderDelivery" + order.getOrderID(), "deliveryGroup")
                    .storeDurably()
                    .usingJobData("order_id", order.getOrderID())
                    .usingJobData("restaurant_id", String.valueOf(order.getRestaurantID()))
                    .usingJobData("user_id", String.valueOf(order.getUserID()))
                    .usingJobData("estimated_time_to_finish", order.getEstimatedTimeToFinish())
                    .usingJobData("order_time", order.getOrderTime().toEpochSecond())
                    .usingJobData("order_complete", order.getOrderComplete())
                    .usingJobData("delivery_address",order.getDeliveryAddress())
                    .usingJobData("delivery_instructions",order.getDeliveryInstructions())
                    .usingJobData("delivery_latitude",order.getDeliveryLatitude())
                    .usingJobData("delivery_longitude", order.getDeliveryLongitude())
                    .usingJobData("restaurant_latitude",order.getRestaurantLatitude())
                    .usingJobData("restaurant_longitude", order.getRestaurantLongitude())

                    .build();

            log.info("**** Created a new job detail for order - {} ****", order.getOrderID());

            long estimatedTimeToFinishInSecs = order.getEstimatedTimeToFinish() * 60;
            Instant deliveryTime = Instant.now().plusSeconds(estimatedTimeToFinishInSecs);

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("trigger-" + order.getOrderID(), "deliveryGroup")
                    .forJob(jobDetail)
                    .startAt(Date.from(deliveryTime))// run when they finish preparing the order
                    .withSchedule(SimpleScheduleBuilder.simpleSchedule().withRepeatCount(0)) //trigger only once
                    .build();

            log.info("**** Created a new Trigger  for order - {} ****", order.getOrderID());

            scheduler.scheduleJob(jobDetail, trigger);

            log.info("**** Successfully scheduled order - {} for delivery  - {}- seconds from now****", order.getOrderID(),deliveryTime);
        }catch (Exception ex){
            log.error("error scheduling order - {} for delivery", order.getOrderID());
            log.error(ex.getMessage());
        }
    }
}
