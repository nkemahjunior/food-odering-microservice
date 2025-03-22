package com.zeco.zecoEats.apiGateway.securityConfig;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.support.ipresolver.XForwardedRemoteAddressResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.net.InetSocketAddress;


@Configuration
public class RateLimitKeyResolver  {

    @Bean
    public KeyResolver customKeyResolver() {
        //we rely on the X-Forwarded-For header to identify the originating IP address of a client connecting through a proxy server.(e.g load balancer)
        //check this guide : https://www.baeldung.com/spring-cloud-gateway-rate-limit-by-client-ip

        return exchange -> {
           XForwardedRemoteAddressResolver resolver = XForwardedRemoteAddressResolver.maxTrustedIndex(1);
           InetSocketAddress inetSocketAddress = resolver.resolve(exchange);
           return Mono.just(inetSocketAddress.getAddress().getHostAddress());
       };
    }
}
