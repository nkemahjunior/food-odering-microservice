import Dishes from "../components/dishes/Dishes";
import Filters from "../components/filters/Filters";
import FoodCategoriesSlider from "../components/FoodCategoriesSlider";

 
 
export default function BrowseDishes() {
    return (
        <>
            <FoodCategoriesSlider />
            <Filters />
            <Dishes/>
            
        </>
    );
}