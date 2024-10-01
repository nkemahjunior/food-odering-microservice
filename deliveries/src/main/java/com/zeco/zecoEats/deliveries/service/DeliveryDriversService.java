package com.deliveries.service;

import com.deliveries.dtos.*;
import com.deliveries.httpCall.UserServiceClient;
import com.deliveries.model.*;
import com.deliveries.repository.AvailableDriversRepository;
import com.deliveries.repository.DeliveryDriversRepository;
import com.deliveries.repository.OrdersDriversBlacklistRepository;
import com.deliveries.repository.OrdersReadyForDeliveryRepository;
import com.deliveries.service.assignDriversToDeliverOrders.AssignDriverFactory;
import com.deliveries.service.assignDriversToDeliverOrders.AssignmentType;
import com.deliveries.service.assignDriversToDeliverOrders.ClosestDriverStrategy;
import com.deliveries.service.availableForWork.AvailableDriverForWork;
import com.deliveries.service.availableForWork.AvailableDriverForWorkFactory;
import com.deliveries.service.availableForWork.AvailableDriverType;
import com.google.firebase.messaging.Message;
import com.zeco.zecoEats.common.NewOrderShared;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    @Autowired
    private AssignDriverFactory assignDriverFactory;

    @Autowired
    private AvailableDriverForWorkFactory availableDriverForWorkFactory;

    private final GeometryFactory geometryFactory = new GeometryFactory();



    /**
     *
     * register a new delivery driver, only if they already have a user account( by signing up)
     */
    public CreateDeliveryDriverDto saveNewDeliveryDriver(CreateDeliveryDriverDto createDeliveryDriverDto){
        GetUserResponseDTO user = getUser(createDeliveryDriverDto.userID());
        DeliveryDrivers driver = setDriverValues(user.getUserID(), createDeliveryDriverDto.vehicleType() );
        DeliveryDrivers saveDd = deliveryDriversRepository.save(driver);
        return new CreateDeliveryDriverDto(saveDd.getUserID(), saveDd.getVehicleType());
    }

    public DeliveryDrivers setDriverValues(UUID userID, String vehicleType){
        DeliveryDrivers drivers = new DeliveryDrivers();
        drivers.setUserID(userID);
        drivers.setVehicleType(vehicleType);
        return drivers;
    }
    public GetUserResponseDTO getUser(UUID userID){
        GetUserResponseDTO user = userServiceClient.getUser(userID);
        if(user.getUserID() == null) throw new  NoSuchElementException("user not found");
        return user;
    }

    /**
     *
     * Update coordinates, online status, fcm_registration_token if the user had already worked in the past
     * OR
     * adds drivers available to work( pick up orders), if they are new
     */
    public void addDriverAvailableForWork(AddAvailableDriverDTO addAvleDriverReq){
        DeliveryDrivers driver = deliveryDriversRepository.findById(addAvleDriverReq.driverID()).orElseThrow(() -> new NoSuchElementException("driver not found"));

        availableDriversRepository.findByDriverID(driver).ifPresentOrElse((availableDriver) -> {
            AvailableDriverForWork<AvailableDrivers> existingAvlDriver =  AvailableDriverForWorkFactory.getAvailableDriver(AvailableDriverType.EXISTING);
            existingAvlDriver.createAvailableDriverForWork(availableDriver,addAvleDriverReq.longitude(), addAvleDriverReq.latitude(), addAvleDriverReq.fcmRegistrationToken() );
        }, () -> {
            AvailableDriverForWork<DeliveryDrivers> newAvlDriver =  AvailableDriverForWorkFactory.getAvailableDriver(AvailableDriverType.NEW);
            newAvlDriver.createAvailableDriverForWork(driver,addAvleDriverReq.longitude(), addAvleDriverReq.latitude(), addAvleDriverReq.fcmRegistrationToken() );
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


    public void assignDeliveryDriverToOrder(NewOrderShared order){
        List<Long> blacklistedDrivers = ordersDriversBlacklistRepository.findAllBlacklistedDriverIdsForThisOrder(order.getOrderID());
        NearbyDriversDTO nearbyDriver = assignDriverFactory.assignDriver(AssignmentType.CLOSEST_DRIVER, order, blacklistedDrivers);
        notifyDriver(nearbyDriver);
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
