package com.deliveries.httpCall;

import com.deliveries.dtos.GetUserResponseDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

import java.util.UUID;

public interface UserServiceClient {

    @GetExchange("/{userID}")
    GetUserResponseDTO getUser(@PathVariable UUID userID);
}