package com.zeco.userManagement.users.service;


import com.zeco.userManagement.users.repository.UsersRepository;
import com.zeco.userManagement.users.dto.GetUserResponseDTO;
import com.zeco.userManagement.users.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private  UsersRepository usersRepository;


    public GetUserResponseDTO getUser(UUID userID){
        Users user = usersRepository.findById(userID).orElseThrow(() -> new NoSuchElementException("user not found"));

        return GetUserResponseDTO.builder()
                .userID(user.getUserID())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .online(user.getOnline())
                .phone(user.getPhone())
                .address(user.getAddress())
                .longitude(user.getLongitude())
                .latitude(user.getLatitude())
                .build();

    }

}
