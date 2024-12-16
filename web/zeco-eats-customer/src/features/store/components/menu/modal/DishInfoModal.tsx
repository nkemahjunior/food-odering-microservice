import CardTitle from "@/shared/components/text/CardTitle";
import DishDescModal from "./DishDescModal";
import SelectionStatus from "./SelectionStatus";
import TellRestaurantAboutAllergy from "./TellRestaurantAboutAllergy";
import QuantityModal from "./QuantityModal";
import ModalButtons from "./ModalButtons";
import SelectionCategory from "./SelectionCategory";

export default function DishInfoModal({
  isModal,
}: {
  isModal: boolean | undefined;
}) {
  return (
    <div className="flex w-full flex-col justify-center space-y-6 px-4 lg:w-[50%] lg:px-0">
      <DishDescModal />

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <CardTitle
              text="Salt and Pepper Popular Boxes Sizes"
              className="font-semibold"
            />
            <SelectionStatus status="Required" />
          </div>
          <p className="text-storeTextColorTint">Choose 1</p>
        </div>

        <div className="divide-y-[1px] divide-backgroundBorder">
          <SelectionCategory />
        </div>
      </div>

      <div className="space-y-2">
        <CardTitle text="Special Instructions" />
        <TellRestaurantAboutAllergy />
        <QuantityModal />
      </div>

      <ModalButtons isModal={isModal} />
    </div>
  );
}
