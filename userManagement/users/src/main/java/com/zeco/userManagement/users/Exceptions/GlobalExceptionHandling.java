package com.zeco.userManagement.users.Exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandling {


    @ExceptionHandler
    public ResponseEntity<CustomErrorResponse> handleGlobalExceptions(NoSuchElementException ex){

        CustomErrorResponse error = CustomErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return  new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
