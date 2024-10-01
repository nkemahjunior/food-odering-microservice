package com.zeco.zecoEats.deliveries.kafkaTopicsConfig;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.retrytopic.RetryTopicConfiguration;
import org.springframework.kafka.retrytopic.RetryTopicConfigurationBuilder;

import java.util.List;

@Configuration
public class KafkaTopicsConfig {

    @Value("${topics.new-order}")
    private String newOrderTopic;

    @RetryableTopic
    @Bean
    public RetryTopicConfiguration myRetryTopic(KafkaTemplate<String, Object> template) {
        return RetryTopicConfigurationBuilder
                .newInstance()
                .exponentialBackoff(5000,2.0, 30000)
                .includeTopics(List.of(newOrderTopic))
                .maxAttempts(10)
                .create(template);

    }

}
