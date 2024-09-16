package com.deliveries.scheduleDeliveries;

import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ExecuteDeliveryJob extends QuartzJobBean {





    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        try{
            Object orderID = context.getMergedJobDataMap().getLong("order_id");

            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info(orderID.toString());
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
            log.info("--------------------------------------------------------------------------------------------------");
        }catch (Exception ex){
            log.error("**** error Triggering order for delivery ****");
            log.error(ex.getMessage());
        }
    }
}
