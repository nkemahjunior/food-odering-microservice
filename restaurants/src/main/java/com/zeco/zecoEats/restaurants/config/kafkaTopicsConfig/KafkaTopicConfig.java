package com.zeco.zecoEats.restaurants.config.kafkaTopicsConfig;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfig {

    @Value("${kafka-address}")
    private String bootstrapAddress;

    @Value("${topics.new-order}")
    private String newOrderTopic;

    @Bean
    public KafkaAdmin admin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        KafkaAdmin admin = new KafkaAdmin(configs);
        admin.setFatalIfBrokerNotAvailable(true); // Fail if broker unavailable
        return admin;
    }

    @Bean
    public NewTopic orderTopic() {
        return TopicBuilder.name(newOrderTopic)
                .partitions(4)
                .replicas(3)
                .compact()
                .build();
    }
}
