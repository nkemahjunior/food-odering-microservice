package com.zeco.zecoEats.deliveries.serviceUnitTests;


import com.zeco.zecoEats.deliveries.dtos.CreateDeliveryDriverDto;
import com.zeco.zecoEats.deliveries.dtos.GetUserResponseDTO;
import com.zeco.zecoEats.deliveries.httpCall.UserServiceClient;
import com.zeco.zecoEats.deliveries.model.DeliveryDrivers;
import com.zeco.zecoEats.deliveries.repository.AvailableDriversRepository;
import com.zeco.zecoEats.deliveries.repository.DeliveryDriversRepository;
import com.zeco.zecoEats.deliveries.repository.OrdersDriversBlacklistRepository;
import com.zeco.zecoEats.deliveries.repository.OrdersReadyForDeliveryRepository;
import com.zeco.zecoEats.deliveries.service.DeliveryDriversService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.UUID;


@ExtendWith(MockitoExtension.class)
public class DeliveryDriversServiceUnitTests {

    @Mock
    private DeliveryDriversRepository deliveryDriversRepository;

    @Mock
    private UserServiceClient userServiceClient;

    @Mock
    private AvailableDriversRepository availableDriversRepository;

    @Mock
    private OrdersReadyForDeliveryRepository ordersReadyForDeliveryRepository;

    @Mock
    private OrdersDriversBlacklistRepository ordersDriversBlacklistRepository;

    @InjectMocks
    private DeliveryDriversService deliveryDriversService;

    @Test
    void shouldSaveNewDeliveryDriver(){
        //given
        UUID userID = UUID.randomUUID();
        CreateDeliveryDriverDto deliveryDriverDto = new CreateDeliveryDriverDto(userID, "bike");

        //when
        GetUserResponseDTO user = getUser(userID);
        when(userServiceClient.getUser(deliveryDriverDto.userID())).thenReturn(user);

        DeliveryDrivers drivers = new DeliveryDrivers();
        drivers.setUserID(user.getUserID());
        drivers.setVehicleType(deliveryDriverDto.vehicleType());

        when(deliveryDriversRepository.save(drivers)).thenReturn(drivers);
        CreateDeliveryDriverDto saved = deliveryDriversService.saveNewDeliveryDriver(deliveryDriverDto);

        //then
        verify(deliveryDriversRepository, times(1)).save(any(DeliveryDrivers.class));
        assertThat(saved.userID()).isEqualTo(deliveryDriverDto.userID());
    }

    GetUserResponseDTO getUser(UUID userID){
        return GetUserResponseDTO.builder()
                .userID(userID)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .online(true)
                .phone("+123456789")
                .address("123 Main St, Springfield")
                .longitude(40.7128f)
                .latitude(-74.0060f)
                .build();
    }




}
