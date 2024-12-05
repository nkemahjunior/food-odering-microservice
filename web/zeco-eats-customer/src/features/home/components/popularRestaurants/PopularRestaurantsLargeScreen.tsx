import PopularRestaurantsCard from "./PopularRestaurantsCard";

 
 
export default function PopularRestaurantLargeScreen() {
    return (


        <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 md:gap-x-2 lg:gap-x-6 xl:gap-x-14 2xl:grid-cols-6 2xl:gap-x-4">
          <PopularRestaurantsCard />
          <PopularRestaurantsCard />
          <PopularRestaurantsCard />
          <PopularRestaurantsCard />
          <PopularRestaurantsCard />
          <PopularRestaurantsCard />
        </div>
     
    );
}