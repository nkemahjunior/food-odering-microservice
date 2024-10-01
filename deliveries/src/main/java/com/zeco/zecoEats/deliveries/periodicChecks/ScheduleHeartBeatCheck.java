package com.zeco.zecoEats.deliveries.periodicChecks;


import com.zeco.zecoEats.common.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

@Slf4j
@Service
public class ScheduleHeartBeatCheck {

    @Autowired
    private Scheduler scheduler;


    public void scheduleHeartBeatCheckMethod(NewOrderShared order)  {
        try{
            log.info("**** scheduling heart beat check for delivery drivers ****");

            JobDetail jobDetail = newJob(ExecuteHeartBeatCheck.class)
                    .withIdentity("heartbeat-check")
                    .storeDurably()
                    .build();



            Trigger trigger = newTrigger()
                    .withIdentity("heartbeat-check")
                    .startNow()
                    .withSchedule(simpleSchedule()
                            .withIntervalInMinutes(3)
                            .repeatForever())
                    .build();



            scheduler.scheduleJob(jobDetail, trigger);

            log.info("**** scheduled heart beat check for delivery drivers to run every 3 minutes forever ****");

        }catch (Exception ex){
            log.error("error creating heart beat check schedule");
            log.error(ex.getMessage());
        }
    }
}
