package com.zeco.zecoEats.deliveries.service.availableForWork;

import com.zeco.zecoEats.deliveries.model.AvailableDrivers;
import com.zeco.zecoEats.deliveries.model.DeliveryDrivers;
import com.zeco.zecoEats.deliveries.repository.AvailableDriversRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class NewAvailableDriver implements AvailableDriverForWork<DeliveryDrivers> {

    @Autowired
    AvailableDriversRepository availableDriversRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    @Override
    public void createAvailableDriverForWork(DeliveryDrivers driver, double longitude, double latitude, String fcmRegistrationToken) {
        AvailableDrivers availableDriver = new AvailableDrivers();
        availableDriver.setDriverID(driver);
        availableDriver.setFcmRegistrationToken(fcmRegistrationToken);

        Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));
        availableDriver.setDriverCoordinates(point);
        availableDriver.setHeartBeat(LocalDateTime.now());
        availableDriversRepository.save(availableDriver);


    }
}
