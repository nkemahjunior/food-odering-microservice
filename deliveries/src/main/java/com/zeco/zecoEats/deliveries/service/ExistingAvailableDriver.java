package com.deliveries.service;

import com.deliveries.model.AvailableDrivers;
import com.deliveries.repository.AvailableDriversRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExistingAvailableDriver implements AvailableDriverForWork<AvailableDrivers> {

    @Autowired
    AvailableDriversRepository availableDriversRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    @Override
    public void createAvailableDriverForWork(AvailableDrivers avlDriver, double longitude, double latitude, String fcmRegistrationToken) {
        avlDriver.setOnline(true);
        avlDriver.setDriverCoordinates(geometryFactory.createPoint(new Coordinate(longitude, latitude)));
        avlDriver.setFcmRegistrationToken(fcmRegistrationToken);

        availableDriversRepository.save(avlDriver);
    }
}
