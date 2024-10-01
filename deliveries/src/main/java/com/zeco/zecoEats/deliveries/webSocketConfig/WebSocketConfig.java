package com.zeco.zecoEats.deliveries.webSocketConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket").
                setAllowedOrigins("http://localhost:3000" ).
                withSockJS();

/*        registry.addEndpoint("/socket").
                setAllowedOrigins("http://localhost:3000", "http://localhost:4000" );*/
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue"); // clients will subscriber to endpoints starting with /topic or /queue. The server will send messages to endpoints starting with /topic or /queue
        registry.setApplicationDestinationPrefixes("/app"); // clients will send messages to the server through endpoint starting with /app
        registry.setPreservePublishOrder(true); //preserve message order
    }

}