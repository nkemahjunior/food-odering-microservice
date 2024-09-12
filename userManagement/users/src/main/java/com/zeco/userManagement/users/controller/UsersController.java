package com.zeco.userManagement.users.controller;

import com.zeco.userManagement.users.dto.GetUserResponseDTO;
import com.zeco.userManagement.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping("/{userID}")
    public ResponseEntity<GetUserResponseDTO> getUSerEndpoint(@PathVariable("userID") String userID){
        return ResponseEntity.ok(usersService.getUser(UUID.fromString(userID)));
    }
}
