package com.deliveries.service;

public interface AvailableDriverForWork<T> {

    public void createAvailableDriverForWork(T driver, double longitude, double latitude, String fcmRegistrationToken);

}
