package com.zeco.restaurants.Exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandling {


    @ExceptionHandler
    public ResponseEntity<CustomErrorResponse> handleNoSuchElementExceptions(NoSuchElementException ex){

        CustomErrorResponse error = CustomErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return  new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public ResponseEntity<CustomErrorResponse> handleDistanceTooFarExceptions(DistanceTooFar ex){

        CustomErrorResponse error = CustomErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return  new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

   /* @ExceptionHandler  don't do this boy
    public ResponseEntity<CustomErrorResponse> handleRuntimeExceptions(RuntimeException ex){

        CustomErrorResponse error = CustomErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return  new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }*/
}
