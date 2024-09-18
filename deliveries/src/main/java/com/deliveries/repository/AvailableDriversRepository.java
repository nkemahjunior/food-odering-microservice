package com.deliveries.repository;

import com.deliveries.dtos.NearbyDriversDTO;
import com.deliveries.model.AvailableDrivers;
import com.deliveries.model.DeliveryDrivers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public interface AvailableDriversRepository extends JpaRepository<AvailableDrivers, Long> {

    /**
     *This query fetches drivers within a particular radius(4000) in the CTE
     * Then we fetch the distances from the CTE , and sort in ascending order
     *
     * The units for spatial reference 4326 are degrees by default, so i am converting it to metres by using ::geography
     */
    @Query(value = """
            WITH nearby_drivers AS (
                SELECT * FROM available_drivers
                WHERE ST_DWithin(
                        coordinates,
                        ST_SetSRID( ST_MakePoint(?1, ?2), 4326)::geography,
                       4000  -- Radius in meters
                )
                And online = false
            )

            SELECT  * , ST_Distance(coordinates, ST_SetSRID(ST_MakePoint(?1, ?2), 4326)::geography) AS distance
            FROM nearby_drivers
            ORDER BY distance ASC""", nativeQuery = true)
    List<NearbyDriversDTO> findDriversCloseToRestaurant(double restaurantLong, double restaurantLat);

    Optional<AvailableDrivers> findByDriverID(DeliveryDrivers driver);

    @Query("UPDATE AvailableDrivers d SET d.online = false WHERE d.heartBeat < ?1")
    void markDriversAsOffline(LocalDateTime cutoffTime);
}
