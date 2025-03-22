package com.zeco.zecoEats.users.controller;

import com.zeco.zecoEats.users.dto.GetUserResponseDTO;
import com.zeco.zecoEats.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("_p/api/users")
public class UsersControllerPrivate {

    @Autowired
    private UsersService usersService;

    @GetMapping("/testPrivate")
    public ResponseEntity<String> testEndpoint(){
        return ResponseEntity.ok( "working private- users-service");
    }

    @GetMapping("/{userID}")
    public ResponseEntity<GetUserResponseDTO> getUSerEndpoint(@PathVariable("userID") String userID){
        return ResponseEntity.ok(usersService.getUser(UUID.fromString(userID)));
    }
}
