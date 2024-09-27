package com.zeco.restaurants.serviceTests;

import com.zeco.restaurants.model.*;
import com.zeco.restaurants.repository.CuisineRepository;
import com.zeco.restaurants.repository.DishesRepository;
import com.zeco.restaurants.repository.MenusRepository;
import com.zeco.restaurants.repository.RestaurantRepository;
import com.zeco.restaurants.restaurantDtos.CreateDishDTO;
import com.zeco.restaurants.restaurantDtos.CreateMenuDTO;
import com.zeco.restaurants.restaurantDtos.CreateRestaurantDTO;
import com.zeco.restaurants.restaurantDtos.GetRestaurantsDTO;
import com.zeco.restaurants.service.RestaurantService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@ExtendWith(MockitoExtension.class)
public class RestaurantServiceTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @Mock
    private MenusRepository menusRepository;

    @Mock
    private  CuisineRepository cuisineRepository;

    @Mock
    private  DishesRepository dishesRepository;

    @InjectMocks// inject the mock dependencies
    private RestaurantService restaurantService;

    AutoCloseable openMocks;

    @BeforeEach
    void setUp() {
       /* openMocks = MockitoAnnotations.openMocks(this); // initialise mock objects*/
        //MockitoAnnotations.openMocks(this);
        //restaurantService = new RestaurantService(restaurantRepository, cuisineRepository, menusRepository, dishesRepository);
    }

/*    @AfterEach
    void tearDown() throws Exception {
        openMocks.close();
    }*/


    @Test
    void shouldCreateRestaurant(){

        //given
        CreateRestaurantDTO restaurantDTO = createRestaurantDTO();

        //when
        Restaurant restaurant = createRestaurant(restaurantDTO);
        when(restaurantRepository.save(restaurant)).thenReturn(restaurant);
        CreateRestaurantDTO saved = restaurantService.createRestaurant(restaurantDTO);

        //then
        verify(restaurantRepository, times(1)).save(any(Restaurant.class));
        assertThat(saved).isEqualTo(restaurantDTO);

    }


    public Restaurant createRestaurant(CreateRestaurantDTO cr){
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantID(cr.getRestaurantID());
        restaurant.setUserID(cr.getUserID());
        restaurant.setPostCode(cr.getPostCode());
        restaurant.setLocation(cr.getLocation());
        restaurant.setAddress(cr.getAddress());
        restaurant.setDescription(cr.getDescription());
        restaurant.setBranding(cr.getBranding());
        restaurant.setRestaurantName(cr.getRestaurantName());
        restaurant.setLatitude(cr.getLatitude());
        restaurant.setRestaurantType(cr.getRestaurantType());
        restaurant.setLongitude(cr.getLongitude());
        restaurant.setMinPricePerOrder(cr.getMinPricePerOrder());
        restaurant.setMaxPricePerOrder(cr.getMaxPricePerOrder());
        restaurant.setOperationalTimes(cr.getOperationalTimes());
        restaurant.setCuisinesSet(new HashSet<>(cr.getCuisines()));
        return  restaurant;

    }

    public CreateRestaurantDTO createRestaurantDTO(){

        //given
        RestaurantOperationalTimes operationalTimes = new RestaurantOperationalTimes();
        operationalTimes.setId(1L);
        operationalTimes.setOpeningDay("Monday");
        operationalTimes.setOpeningTime(LocalTime.of(9, 0));
        operationalTimes.setClosingDay("Monday");
        operationalTimes.setClosingTime(LocalTime.of(17, 0));

        Cuisines cuisine = new Cuisines();
        cuisine.setCuisineID(1L);
        cuisine.setName("bla bla");

        return CreateRestaurantDTO.builder()
                .restaurantID(UUID.randomUUID())
                .userID(UUID.randomUUID())
                .postCode("12345")
                .location("Downtown")
                .address("123 Main St")
                .description("A cozy place for dining.")
                .branding("Best Eats")
                .restaurantType("Casual Dining")
                .restaurantName("The Good Food")
                .longitude(-75.12345)
                .latitude(39.12345)
                .minPricePerOrder(new BigDecimal("10.00"))
                .maxPricePerOrder(new BigDecimal("50.00"))
                .operationalTimes(List.of(operationalTimes))
                .cuisines(List.of(cuisine))
                .build();
    }


    @Test
    void shouldCreateMenu(){
        //given
        UUID restaurantID = UUID.randomUUID();
        CreateMenuDTO createMenuDTO = new CreateMenuDTO(1L, restaurantID, "bla bla");

        //when
        Menus menu = setMenuValues(createMenuDTO);
        when(restaurantRepository.findById(restaurantID)).thenReturn(Optional.of(new Restaurant()));
        when(menusRepository.save(menu)).thenReturn(menu);
        CreateMenuDTO saved = restaurantService.createMenu(createMenuDTO);

        //then
        verify(menusRepository, times(1)).save(menu);
        //assertThat(saved.restaurant()).isEqualTo(createMenuDTO.restaurant());
        assertThat(saved.menuName()).isEqualTo(createMenuDTO.menuName());
    }

    public Menus setMenuValues(CreateMenuDTO cm){
        Menus menu = new Menus();
        menu.setMenuID(cm.menuID());
        menu.setRestaurantID(new Restaurant());
        menu.setMenuName(cm.menuName());
        return menu;
    }

    @Test
    void shouldNotCreateMenuIfRestaurantIsNotFoundAndThrowAnException(){
        //given
        UUID restaurantID = UUID.randomUUID();
        CreateMenuDTO createMenuDTO = new CreateMenuDTO(1L, restaurantID, "bla bla");

        //when
        when(restaurantRepository.findById(restaurantID)).thenReturn(Optional.empty());

        //then
        assertThatThrownBy(() -> restaurantService.createMenu(createMenuDTO)).
                isInstanceOf(NoSuchElementException.class).
                hasMessage("restaurant not found");
    }

    @Test
    void shouldCreateDish(){
        //given
        CreateDishDTO createDishDTO = new CreateDishDTO(1L, UUID.randomUUID(),5L,"45",
                "bl bla", new BigDecimal(55550),false,50L,5L,"hh",List.of());

        //when
        Dishes dish = setDishValues(createDishDTO);
        when(menusRepository.findById(createDishDTO.menuID())).thenReturn(Optional.of(new Menus()));
        when(restaurantRepository.findById(createDishDTO.restaurantID())).thenReturn(Optional.of(new Restaurant()));
        when(dishesRepository.save(dish)).thenReturn(dish);

        CreateDishDTO saved = restaurantService.createDish(createDishDTO);

        verify(dishesRepository, times(1)).save(dish);

    }

    Dishes setDishValues(CreateDishDTO cd){
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantID(cd.restaurantID());

        Menus menu = new Menus();
        menu.setMenuID(cd.menuID());

        Dishes dish = new Dishes();
        dish.setDishID(1L);
        dish.setRestaurant(restaurant);
        dish.setMenu(menu);
        dish.setCookingTime(cd.cookingTime());
        dish.setDescription(cd.description());
        dish.setPrice(cd.price());
        dish.setDiscount(cd.discount());
        dish.setDiscountPrice(cd.discountPrice());
        dish.setLikes(cd.likes());

        return dish;

    }


    @Test
    void shouldThrowErrorWhenTryingToCreateADishWithTheWrongMenuOrRestaurantID(){
        //given
        CreateDishDTO createDishDTO = new CreateDishDTO(1L, UUID.randomUUID(),5L,"45",
                "bl bla", new BigDecimal(55550),false,50L,5L,"hh",List.of());
        //when
        when(menusRepository.findById(createDishDTO.menuID())).thenReturn(Optional.empty());
       // when(restaurantRepository.findById(createDishDTO.restaurantID())).thenReturn(Optional.empty());

        //then
        assertThatThrownBy(() -> restaurantService.createDish(createDishDTO)).
                isInstanceOf(NoSuchElementException.class).
                hasMessage("Menu not found");
    }















}
