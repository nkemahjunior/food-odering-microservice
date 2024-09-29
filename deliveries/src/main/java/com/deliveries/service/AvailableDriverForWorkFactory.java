package com.deliveries.service;

import org.springframework.stereotype.Component;


public class AvailableDriverForWorkFactory {

    public  enum AvailableDriverType{
        EXISTING, NEW
    }

    public static <T> AvailableDriverForWork<T> getAvailableDriver(AvailableDriverType type){
        switch (type){
            case NEW:
                return (AvailableDriverForWork<T>) new NewAvailableDriver();
            case EXISTING:
                return (AvailableDriverForWork<T>) new ExistingAvailableDriver();
            default:
                throw new IllegalArgumentException("Unknown driver type: " + type);
        }
    }
}
