package com.zeco.zecoEats.deliveries.dtos;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class OrderCurrentLocationDTO /*implements Serializable */{
    long orderID;
    double latitude;
    double longitude;
}
