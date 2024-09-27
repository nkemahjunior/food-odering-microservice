package com.deliveries.service;

import com.deliveries.dtos.*;
import com.deliveries.httpCall.UserServiceClient;
import com.deliveries.model.*;
import com.deliveries.repository.AvailableDriversRepository;
import com.deliveries.repository.DeliveryDriversRepository;
import com.deliveries.repository.OrdersDriversBlacklistRepository;
import com.deliveries.repository.OrdersReadyForDeliveryRepository;
import com.google.firebase.messaging.Message;
import com.zeco.shared.NewOrderShared;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

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

    @Autowired
    private OrdersDriversBlacklistRepository ordersDriversBlacklistRepository;


    private final GeometryFactory geometryFactory = new GeometryFactory();

    /*@CircuitBreaker(name = "user-service", fallbackMethod = "errorGettingUser")*/
    public GetUserResponseDTO getUser(UUID userID){
        return userServiceClient.getUser(userID);
    }


    /**
     *
     * register a new delivery driver, only if they already have a user account( by signing up)
     */
    public CreateDeliveryDriverDto saveNewDeliveryDriver(CreateDeliveryDriverDto createDeliveryDriverDto){
        log.info("**** verifying the user's id - {} ****", createDeliveryDriverDto.userID());
        GetUserResponseDTO user = getUser(createDeliveryDriverDto.userID());
        if(user.getUserID() == null) throw new  NoSuchElementException("user not found");

        log.info("**** valid user id - {} ****", createDeliveryDriverDto.userID());

        DeliveryDrivers drivers = new DeliveryDrivers();
        drivers.setUserID(user.getUserID());
        drivers.setVehicleType(createDeliveryDriverDto.vehicleType());

        DeliveryDrivers saveDd = deliveryDriversRepository.save(drivers);
        log.info("**** saved the user's id - {} ****", createDeliveryDriverDto.userID());

        return new CreateDeliveryDriverDto(saveDd.getUserID(), saveDd.getVehicleType());

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

        availableDriversRepository.findByDriverID(driver).ifPresentOrElse((availableDriver) -> {
            oldAvailableDriver(availableDriver,addAvailableDriverDTO.longitude(), addAvailableDriverDTO.latitude(), addAvailableDriverDTO.fcmRegistrationToken());
        }, () -> {
            firstTimeAvailableDriver(driver, addAvailableDriverDTO.longitude(), addAvailableDriverDTO.latitude(), addAvailableDriverDTO.fcmRegistrationToken());

        } );

    }

    public void oldAvailableDriver(AvailableDrivers driver, double longitude, double latitude, String fcmRegistrationToken){
        log.info("**** Driver already exist - {}, updating driver's properties ", driver.getDriverID());
        driver.setOnline(true);
        driver.setDriverCoordinates(geometryFactory.createPoint(new Coordinate(longitude, latitude)));
        driver.setFcmRegistrationToken(fcmRegistrationToken);
        availableDriversRepository.save(driver);
        log.info("**** Driver  - {} properties updated", driver.getDriverID());
    }

    public void firstTimeAvailableDriver( DeliveryDrivers driver, double longitude, double latitude, String fcmRegistrationToken){
        log.info("**** Driver does not exist - {}, creating new driver available for work ", driver.getDriverID());
        AvailableDrivers availableDriver = new AvailableDrivers();
        availableDriver.setDriverID(driver);
        availableDriver.setFcmRegistrationToken(fcmRegistrationToken);

        //GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));
        availableDriver.setDriverCoordinates(point);
        availableDriver.setHeartBeat(LocalDateTime.now());

        availableDriversRepository.save(availableDriver);
        log.info("**** saved new driver available for work - {}", driver.getDriverID());
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


    /**
     *
     * @param order - the order whose estimated time to prepare has expired. the ExecuteDeliveryJob calls this method when necessary
     * The ExecuteDeliveryJob- (scheduleDeliveries package) calls this method for each order when their estimated time to prepare expires
     *
     * This method assigns the closest driver to the restaurant( restaurant preparing the order)
     *  if the driver accepts the order, then fine
     * if the driver declines the order, this method is called again, but the driver who declined the order will not more be included in the
     * search for new drivers to deliver the order
     */
    public void assignDeliveryDriverToOrder(NewOrderShared order){
        log.info("**** getting all blacklisted drivers for order - {} ****", order.getOrderID());

        List<Long> blacklistedDrivers = null;
        //get drivers who decline to deliver this order
       blacklistedDrivers = ordersDriversBlacklistRepository.findAllBlacklistedDriverIdsForThisOrder(order.getOrderID());

        log.info("**** got all blacklisted drivers for order - {} ****", order.getOrderID());
        log.info("**** looking for the closest driver to the restaurant - {} preparing the order  ****", order.getRestaurantID());

        if(blacklistedDrivers.isEmpty()) blacklistedDrivers = List.of(0L);

       //don't add the blacklisted drivers when searching for different drivers who can deliver the order
       List<NearbyDriversDTO> driversCloseToRestaurant = availableDriversRepository.findDriversCloseToRestaurant(order.getRestaurantLongitude(), order.getRestaurantLatitude(), blacklistedDrivers);

        log.info("**** selected list of closest drivers to restaurant -{}  ****", order.getRestaurantID());

       //send a push notification to the closest driver
        notifyDriver(driversCloseToRestaurant.get(0));
    }



    //TODO finish this method, its incomplete, you need to send the right messages in "putData"
    private void notifyDriver(NearbyDriversDTO nearbyDriver){
        try {
            log.info("**** sending push notification to driver -{} to deliver order", nearbyDriver.getDriverId());
            // See documentation on defining a message payload.
            Message message = Message.builder()

                    .putData("delivery fee", "test - 850")
                    .setToken("registrationToken") //TODO drivers registration token
                    .build();


            //String response = FirebaseMessaging.getInstance().send(message);
           // System.out.println("Successfully sent message: " + response);


       /* }catch (FirebaseMessagingException firebaseEx){
            log.error("**** firebase exception ****");
            log.error(firebaseEx.getMessage());*/
        }catch (Exception ex){
            log.error("**** error sending push notification to driver - ****");
            log.error(ex.getMessage());
        }
    }




    /**
     *Assigns a driver to an order when they accept to deliver it
     * The order was already saved in the database when the estimated time to prepare the order expired, and it was executed by the scheduler, so now we just assign a driver to the order
     */
    public void acceptToDeliverOrder(AcceptOrDeclineDeliveryDTO acceptDeliveryDTO){
        OrdersReadyForDelivery order = ordersReadyForDeliveryRepository.findById(acceptDeliveryDTO.orderID()).orElseThrow(() -> new NoSuchElementException(" order not found"));
        DeliveryDrivers driver = deliveryDriversRepository.findById(acceptDeliveryDTO.driverID()).orElseThrow(() -> new NoSuchElementException(" driver  not found"));

        order.setDeliveryDriver(driver);
        ordersReadyForDeliveryRepository.save(order);
    }


    /**
     * when a driver declines an order, they are blacklisted against that particular order so,
     * they will not be included in the next list of drivers that we are trying to assign to that order
     * @Example
     * if we see 5 drivers close to a restaurant, i first assign the closest driver to the order, if the driver declines they are blacklisted against that order,
     * then we take the next closest driver and so on
     *
     */
    public void declineToDeliverOrder(AcceptOrDeclineDeliveryDTO declineDeliveryDTO){
        OrdersReadyForDelivery order = ordersReadyForDeliveryRepository.findById(declineDeliveryDTO.orderID()).orElseThrow(() -> new NoSuchElementException(" order not found"));
        DeliveryDrivers driver = deliveryDriversRepository.findById(declineDeliveryDTO.driverID()).orElseThrow(() -> new NoSuchElementException(" driver  not found"));

        OrdersDriverBlackList odB = new OrdersDriverBlackList();
        odB.setDriverID(driver);
        odB.setOrder(order);
        ordersDriversBlacklistRepository.save(odB);

        //TODO notify another driver/ assign order
        //notifyDriver();
    }

}
