package com.zeco.zecoEats.deliveries.service.availableForWork;

public interface AvailableDriverForWork<T> {

    public void createAvailableDriverForWork(T driver, double longitude, double latitude, String fcmRegistrationToken);

}
