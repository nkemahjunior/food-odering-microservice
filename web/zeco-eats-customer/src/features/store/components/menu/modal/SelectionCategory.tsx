import EditSelectionsModal from "./EditSelectionsModal";
import RadioButtonSelectionModal from "./RadioButtonSelectionModal";
import SelectionCategoryItem from "./SelectionCategoryItem";

 
 
export default function SelectionCategory() {
    return (
      <div className=" space-y-4 ">
        <div className="">
          <div>
            <div className="flex items-center justify-between">
              <SelectionCategoryItem />
              <RadioButtonSelectionModal />
            </div>
          </div>
        </div>

        <EditSelectionsModal />
      </div>
    );
}