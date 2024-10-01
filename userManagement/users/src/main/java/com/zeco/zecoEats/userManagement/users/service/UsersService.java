package com.zeco.zecoEats.userManagement.users.service;


import com.zeco.zecoEats.userManagement.users.repository.UsersRepository;
import com.zeco.zecoEats.userManagement.users.dto.GetUserResponseDTO;
import com.zeco.zecoEats.userManagement.users.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private  UsersRepository usersRepository;


    public GetUserResponseDTO getUser(UUID userID){
        Optional<Users> userOptional = usersRepository.findById(userID);

        if(userOptional.isEmpty()) return GetUserResponseDTO.builder().build();

        Users user = userOptional.get();
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
