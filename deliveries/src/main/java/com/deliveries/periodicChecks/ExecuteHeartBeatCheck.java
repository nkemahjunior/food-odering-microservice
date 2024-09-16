package com.deliveries.periodicChecks;

import com.deliveries.service.DeliveryDriversService;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class ExecuteHeartBeatCheck extends QuartzJobBean {

    @Autowired
    private DeliveryDriversService deliveryDriversService;

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {

        log.info("**** looking for idle drivers ****");

        deliveryDriversService.setIdleDriversOffline();

        log.info("**** Changed the status of all idle drivers to  offline ****");
    }
}
