package com.zeco.restaurants.Exceptions;

import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
@Profile("dev")
public class GlobalExceptionHandlingDev {

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

/*    @ExceptionHandler
    public ResponseEntity<CustomErrorResponse> handleGenericException(Exception ex) {
        CustomErrorResponse error = CustomErrorResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("An unexpected error occurred.")
                .build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }*/

    @ExceptionHandler
    public ResponseEntity<CustomErrorResponse> handleRuntimeExceptions(Exception ex){

        CustomErrorResponse error = CustomErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .build();

        return  new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
