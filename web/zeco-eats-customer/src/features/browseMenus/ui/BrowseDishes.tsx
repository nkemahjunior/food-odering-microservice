import Logo from "@/shared/components/Logo";
import Dishes from "../components/dishes/Dishes";
import Filters from "../components/filters/Filters";
import FoodCategoriesSlider from "../components/FoodCategoriesSlider";
import UserLocation from "@/shared/components/navbar/UserLocation";

 
 
export default function BrowseDishes() {
    return (
      <>
        {/* <div className=" flex">
          <Logo text1Size="text-xl" />
          <UserLocation iconSize={24} />
        </div> */}
        <FoodCategoriesSlider />
        <Filters />
        <Dishes />
            
      </>
    );
}