package com.deliveries.service;

import com.deliveries.dtos.*;
import com.deliveries.httpCall.UserServiceClient;
import com.deliveries.model.AvailableDrivers;
import com.deliveries.model.DeliveryDrivers;
import com.deliveries.model.OrdersReadyForDelivery;
import com.deliveries.model.UpdateDriverLocationDTO;
import com.deliveries.repository.AvailableDriversRepository;
import com.deliveries.repository.DeliveryDriversRepository;
import com.deliveries.repository.OrdersReadyForDeliveryRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.zeco.shared.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
public class DeliveryDriversService {

    @Autowired
    private DeliveryDriversRepository deliveryDriversRepository;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private AvailableDriversRepository availableDriversRepository;

    @Autowired
    private OrdersReadyForDeliveryRepository ordersReadyForDeliveryRepository;

    @Autowired DeliveryDrivers deliveryDrivers;


    private final GeometryFactory geometryFactory = new GeometryFactory();

    /**
     *
     * register a new delivery driver, only if they already have a user account( by signing up)
     */
    public void saveNewDeliveryDriver(CreateDeliveryDriverDto createDeliveryDriverDto){
        log.info("**** verifying the user's id - {} ****", createDeliveryDriverDto.userID());
        GetUserResponseDTO user =  userServiceClient.getUser(createDeliveryDriverDto.userID());
        log.info("**** valid user id - {} ****", createDeliveryDriverDto.userID());


        DeliveryDrivers drivers = new DeliveryDrivers();
        drivers.setUserID(user.getUserID());
        drivers.setVehicleType(createDeliveryDriverDto.vehicleType());

        deliveryDriversRepository.save(drivers);
        log.info("**** saved the user's id - {} ****", createDeliveryDriverDto.userID());
    }


    /**
     *
     * Update coordinates, online status, fcm_registration_token if the user had already worked in the past
     * OR
     * adds drivers available to work( pick up orders), if they are new
     */
    public void addDriverAvailableForWork(AddAvailableDriverDTO addAvailableDriverDTO){
        log.info("**** verifying driver's id - {}", addAvailableDriverDTO.driverID());

        DeliveryDrivers driver = deliveryDriversRepository.findById(addAvailableDriverDTO.driverID()).orElseThrow(() -> new NoSuchElementException("driver not found"));
        log.info("**** verified driver's id - {}", addAvailableDriverDTO.driverID());


        availableDriversRepository.findByDriverID(driver).ifPresentOrElse((driverFound) -> {
            log.info("**** Driver already exist - {}, updating driver's properties ", addAvailableDriverDTO.driverID());
            driverFound.setOnline(true);
            driverFound.setDriverCoordinates(geometryFactory.createPoint(new Coordinate(addAvailableDriverDTO.longitude(), addAvailableDriverDTO.latitude())));
            driverFound.setFcmRegistrationToken(addAvailableDriverDTO.fcmRegistrationToken());
            availableDriversRepository.save(driverFound);
            log.info("**** Driver  - {} properties updated", addAvailableDriverDTO.driverID());


        }, () -> {
            log.info("**** Driver does not exist - {}, creating new driver available for work ", addAvailableDriverDTO.driverID());
            AvailableDrivers availableDriver = new AvailableDrivers();
            availableDriver.setDriverID(driver);
            availableDriver.setFcmRegistrationToken(addAvailableDriverDTO.fcmRegistrationToken());

            log.info("**** creating coordinates for driver - {}", addAvailableDriverDTO.driverID());
            //GeometryFactory geometryFactory = new GeometryFactory();
            Point point = geometryFactory.createPoint(new Coordinate( addAvailableDriverDTO.longitude(), addAvailableDriverDTO.latitude()));

            log.info("**** saving coordinates for driver - {}", addAvailableDriverDTO.driverID());
            availableDriver.setDriverCoordinates(point);
            availableDriver.setHeartBeat(LocalDateTime.now());

            availableDriversRepository.save(availableDriver);
            log.info("**** saved coordinates for driver - {}", addAvailableDriverDTO.driverID());
        } );

    }


    /**
     *
     * updates driver's location and heart beat
     */
    public void updateDriverLocationAndHeartBeat(UpdateDriverLocationDTO updateDriverLocationDTO){
        log.info("**** updating driver -{} location and heartBeat", updateDriverLocationDTO.avlDriverID());
        AvailableDrivers driver = availableDriversRepository.findById(updateDriverLocationDTO.avlDriverID()).orElseThrow(() -> new NoSuchElementException("not found"));
        driver.setDriverCoordinates(geometryFactory.createPoint(new Coordinate(updateDriverLocationDTO.longitude(), updateDriverLocationDTO.latitude())));
        driver.setOnline(true);
        driver.setHeartBeat(LocalDateTime.now());

        availableDriversRepository.save(driver);
        log.info("**** updated driver -{} location and heartBeat", updateDriverLocationDTO.avlDriverID());

    }


    /**
     * The HeartBeatCheck  scheduler runs this method every 3 minutes and sets the online status to false for
     * all drivers whose last heart beat was more than 5 minutes ago
     */
    public void setIdleDriversOffline(){
        LocalDateTime cutOffTime = LocalDateTime.now().minusMinutes(5);
        availableDriversRepository.markDriversAsOffline(cutOffTime);
    }



    public void getDeliveryDriver(NewOrderShared order){
        List<NearbyDriversDTO> test = availableDriversRepository.findDriversCloseToRestaurant(order.getRestaurantLongitude(), order.getRestaurantLatitude());



    }



    //TODO finish this method, its incomplete, you need to send the write messages in "putData"
    private void notifyDriver(){
        try {

            // See documentation on defining a message payload.
            Message message = Message.builder()

                    .putData("score", "850")
                    .putData("time", "2:45")
                    .setToken("registrationToken") //TODO drivers registration token
                    .build();


            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);


        }catch (FirebaseMessagingException firebaseEx){
            log.error("**** firebase exception ****");
            log.error(firebaseEx.getMessage());
        }catch (Exception ex){
            log.error("**** error sending push notification to driver - ****");
            log.error(ex.getMessage());
        }
    }


    /**
     *Assigns a driver to an order when they accept to deliver it
     * The order was already saved in the database when the estimated time to prepare the order expired, and it was executed by the scheduler, so now we just assign a driver to the order
     */
    public void acceptToDeliverOrder(AcceptDeliveryDTO acceptDeliveryDTO){
        OrdersReadyForDelivery order = ordersReadyForDeliveryRepository.findById(acceptDeliveryDTO.orderID()).orElseThrow(() -> new NoSuchElementException(" order not found"));
        DeliveryDrivers driver = deliveryDriversRepository.findById(acceptDeliveryDTO.driverID()).orElseThrow(() -> new NoSuchElementException(" driver  not found"));

        order.setDeliveryDriver(driver);
        ordersReadyForDeliveryRepository.save(order);
    }

    public void declineOrder(AcceptDeliveryDTO){

    }
}
