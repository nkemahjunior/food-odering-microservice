package com.zeco.zecoEats.restaurants.service;


import com.zeco.zecoEats.restaurants.repository.OrdersRepository;
import com.zeco.restaurants.restaurantDtos.*;
import com.zeco.zecoEats.restaurants.service.deliveryFeeStrategies.DeliveryFeeStrategyFactory;
import com.zeco.zecoEats.restaurants.service.placeOrderTemplate.PlaceOrderTemplate;
import com.zeco.zecoEats.restaurants.restaurantDtos.GetDeliveryFee;
import com.zeco.zecoEats.restaurants.restaurantDtos.PlaceOrderDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class OrdersService {

    @Autowired
    PlaceOrderTemplate placeOrderTemplate;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private DeliveryFeeStrategyFactory deliveryFeeStrategyFactory;


    public void  placeOrder(List<PlaceOrderDTO> placeOrderDTO){
        placeOrderTemplate.placeOrder(placeOrderDTO, ordersRepository);
    }

    public GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates ){
        return deliveryFeeStrategyFactory.calculateDeliveryFee(customerLongitude, customerLat, restaurantCoordinates);
    }


   /* public void  placeOrder(List<PlaceOrderDTO > placeOrderDTO){


        UUID key = UUID.randomUUID();
        //call to the users-service
        GetUserResponseDTO user = userServiceClient.getUser(placeOrderDTO.get(0).user_id());// no matter the number of orders, It's still the same user, so take the user id from one of the orders
        if(user == null) throw new RuntimeException(" user not found");

        for (PlaceOrderDTO order: placeOrderDTO){

            Restaurant restaurant = restaurantRepository.findById(order.restaurantID()).orElseThrow(() -> new NoSuchElementException("restaurant not found, can not place order"));

            Orders orderObj = new Orders();
            orderObj.setRestaurant(restaurant);
            orderObj.setCustomer(user.getUserID());
            orderObj.setSpecialInstructions(order.specialInstructions());
            orderObj.setEstimatedTimeToFinish(order.estimatedTimeToFinish());
            orderObj.setOrderTime(order.orderTime());
            orderObj.setOrderComplete(false);
            orderObj.setDeliveryAddress(order.deliveryAddress()); // why are you not taking the user address from the user( which you got from the user service) above? maybe customer can change their delivery location when ordering e.g. like to their office
            orderObj.setDeliveryInstructions(order.deliveryInstructions());
            orderObj.setDeliveryLatitude(order.deliveryLatitude());
            orderObj.setDeliveryLongitude(order.deliveryLongitude());


            // user might order more than one DISH from the same restaurant
            order.dishAndSpices().forEach( dishAndSpice -> {

                       OrderDishes orderDish = new OrderDishes();
                       Dishes dish = dishesRepository.findById(dishAndSpice.getDishID()).orElseThrow(() -> new NoSuchElementException("dish not found - "));
                       //setting only the dishID field of orderDish, the  orderObj.addDishesForOrder(orderDish); will take care of setting the orderID field
                       orderDish.setDishID(dish);

                       // a user might request for multiple SPICES to be added to a particular dish
                        if(dishAndSpice.getSpiceIDs() != null){

                            dishAndSpice.getSpiceIDs().forEach( spiceForDish -> {
                                OrdersDishSpices ordersDishSpice = new OrdersDishSpices();

                                Spices spice = spicesRepository.findById(spiceForDish).orElseThrow(() -> new NoSuchElementException(" spice requested for dish not found -"));
                                //setting only the spiceID field of ordersDishSpice, the   orderDish.addSpicesForAOrderDish(ordersDishSpice); will take care of setting the orderDishID field
                                ordersDishSpice.setSpiceID(spice);
                                orderDish.addSpicesForAOrderDish(ordersDishSpice);
                            });
                        }

                       orderObj.addDishesForOrder(orderDish);
            });

            Orders savedOrder = ordersRepository.save(orderObj);



            NewOrderShared newOrderShared = NewOrderShared.builder().
                    orderID(savedOrder.getOrderID()).
                    restaurantID(savedOrder.getRestaurant().getRestaurantID()).
                    userID(savedOrder.getCustomer()).
                    estimatedTimeToFinish(savedOrder.getEstimatedTimeToFinish()).
                    orderTime(savedOrder.getOrderTime()).
                    orderComplete(savedOrder.getOrderComplete()).
                    deliveryAddress(savedOrder.getDeliveryAddress()).
                    deliveryInstructions(savedOrder.getDeliveryInstructions()).
                    deliveryLatitude(savedOrder.getDeliveryLatitude()).
                    deliveryLongitude(savedOrder.getDeliveryLongitude()).
                    restaurantLongitude(restaurant.getLongitude()).
                    restaurantLatitude(restaurant.getLatitude()).
                    build();

            sendOrder(newOrderShared, key);

        }

    }*/


/*    public void sendOrder(NewOrderShared deliveryOrder, UUID key){
        kafkaTemplate.send(newOrderTopic, key.toString(), deliveryOrder);
    }*/




    /**
     *calculate delivery fee based on the distance between the customer and the restaurant(s)
     */
    /*public GetDeliveryFee calculateDeliveryFee(String customerLongitude, String customerLat, List<String> restaurantCoordinates ){

        //if only one restaurant coordinate is passed to the url e.g. restaurantCoordinates=4.159513,9.276448  it will automatically be split into two strings at the comma,
        // so the list will contain " 4.159513" and "9.276448", so the first coordinate should not contain a comma
        //
        //if more than one restaurant is passed e.g. restaurantCoordinates=4.159513,9.276448 & restaurantCoordinates=6.159513,10.276448, it will be split into two strings, but
        //each of the restaurant coordinates will be joined to one including the comma so the list will contain "4.159513,9.276448" and "6.159513,10.276448", so the first
        //element will contain a comma
        boolean multipleRestaurants = restaurantCoordinates.get(0).contains(",");

        if(multipleRestaurants){

            List<String> distances = fetchMultipleDistances(customerLongitude, customerLat, restaurantCoordinates);

            double cumulativeDistance = 0;
            if(distances != null){
                for(String distance : distances){
                    cumulativeDistance = cumulativeDistance + Double.parseDouble(distance);
                }
            }else {
                log.info("distance list is missing");
                throw new RuntimeException();
            }

            double price = getFee(cumulativeDistance);
            if(price < 0) throw new DistanceTooFar("Restaurant is too far from your location");

            return  new GetDeliveryFee(price);


        }else {
            URI uri = createUri(customerLongitude,customerLat,restaurantCoordinates.get(0),restaurantCoordinates.get(1));
            Mono<String> distanceMono = fetchDistance(uri);
            String distance = distanceMono.block();

            assert distance != null;
            double price = getFee(Double.parseDouble(distance));
            if(price < 0) throw new DistanceTooFar("Restaurant is too far from your location");

            return  new GetDeliveryFee(price);
        }

    }*/

    /**
     *
     * @param distance distance in meters
     * @return the price based on the distance
     */
   /* public double getFee(double distance){

        if( distance >= 0 && distance <= 2700) return  400;
        if( distance > 2700 && distance <= 5400) return  800;
        if( distance > 5400 && distance <= 8100) return  1200;
        if( distance > 8100 && distance <= 10800) return  1600;
        if( distance >= 10800 && distance <= 13500) return  2000;
        if( distance > 13500 && distance <= 16200) return  2400;
        if( distance > 16200 && distance <= 18900) return  2800;
        if( distance > 18900 && distance <= 21600) return  3200;

        return -1;
    }*/

    /**
     *
     * @param customerLongitude customer longitude
     * @param customerLat customer latitude
     * @param restaurantCoordinates list of restaurant coordinates( latitude and longitude) for which the customer wants to order from
     * @return list of the distances from the respective restaurants and the customer's location
     */
    /*public List<String> fetchMultipleDistances(String customerLongitude,String customerLat,List<String> restaurantCoordinates ){
        List<Mono<String>> distanceMonos = restaurantCoordinates.stream().map(coordinates -> {

            // longitude, latitude in that order
            String[] latLon = coordinates.split(",");

            URI uri = createUri(customerLongitude,customerLat,latLon[0],latLon[1]);
            return fetchDistance(uri);

        }).collect(Collectors.toList());

        List<String> distances = Flux.merge(distanceMonos).collectList().block();

        return distances;
    }*/


 /*   public Mono<String> fetchDistance(URI uri){

        Mono<String> distance =  webClient
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {}) // convert json response to key,pair values
                .map(response -> {
                    //  routes is an array of key pair values, so I can convert to a List of maps
                    Map<String, Object> route = ((List<Map<String, Object>>) response.get("routes")).get(0);
                    return String.valueOf(route.get("distance"));
                });

        return distance;
    }*/


/*    public URI createUri( String customerLongitude,String customerLat, String restaurantLongitude, String restaurantLatitude){
         return  UriComponentsBuilder
                .fromHttpUrl("https://api.mapbox.com")
                .path("/directions/v5/mapbox/driving/{long1},{lat1};{long2},{lat2}")
                .queryParam("access_token",accessToken)
                .build(customerLongitude,customerLat, restaurantLongitude, restaurantLatitude);
    }*/





}
