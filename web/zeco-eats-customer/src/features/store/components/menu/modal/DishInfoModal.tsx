import CardTitle from "@/shared/components/text/CardTitle";
import DishDescModal from "./DishDescModal";
import TellRestaurantAboutAllergy from "./TellRestaurantAboutAllergy";
import QuantityModal from "./QuantityModal";
import ModalButtons from "./ModalButtons";
import Line from "@/shared/components/Line";
import Selection from "./Selection";

export default function DishInfoModal({
  isModal,
}: {
  isModal: boolean | undefined;
  }) {
  
  const fakeArr = Array.from({length:5})
  return (
    <div className="flex w-full flex-col justify-center space-y-6 px-4 lg:w-[50%] lg:px-0">
      <DishDescModal />
      <Line />

      <div className="space-y-4">
        {fakeArr.map((_, i) => (
          <Selection key={i} title="Add Some Sauce?" status="Required" chooseAmt={2} selectionType={i >= 0 && i<2 ? "qty" : i >=2 && i<4 ? "radio" : "checkBox" } />
        ))}
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
