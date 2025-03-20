package com.zeco.zecoEats.restaurants.config.redisCacheConfig;

import io.lettuce.core.ReadFrom;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableCaching
public class RedisCacheConfig {

    @Bean
    public RedisConnectionFactory connectionFactory(RedisProperties redisProperties) {
        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .readFrom(ReadFrom.REPLICA_PREFERRED) //write to master, read from replicas
                .build();

        RedisClusterConfiguration clusterConfig = new RedisClusterConfiguration(redisProperties.getCluster().getNodes());
        clusterConfig.setPassword(RedisPassword.of(redisProperties.getPassword()));
        return new LettuceConnectionFactory(clusterConfig, clientConfig);
    }

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        // Default cache configuration
        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10))
                .disableCachingNullValues()
                .prefixCacheNameWith("restaurant::")
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer())) //string serialization
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));  // JSON serialization

        // Custom TTLs for specific caches
        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        cacheConfigurations.put("restaurants",
                defaultConfig.entryTtl(Duration.ofDays(7))
                        .prefixCacheNameWith("restaurants::"));

        cacheConfigurations.put("deliveryFee",
                defaultConfig.entryTtl(Duration.ofHours(3))
                .prefixCacheNameWith("deliveryFee::"));

        cacheConfigurations.put("orders",
                defaultConfig.entryTtl(Duration.ofMinutes(5))
                .prefixCacheNameWith("orders::"));

        cacheConfigurations.put("menus",
                defaultConfig.entryTtl(Duration.ofDays(7))
                        .prefixCacheNameWith("menus::"));

        cacheConfigurations.put("dishes",
                defaultConfig.entryTtl(Duration.ofDays(1))
                        .prefixCacheNameWith("dishes::"));


        return RedisCacheManager.builder(redisConnectionFactory)
                .transactionAware()
                .cacheDefaults(defaultConfig)
                .withInitialCacheConfigurations(cacheConfigurations)
                .enableStatistics()
                .build();
    }
}
