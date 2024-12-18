import CardTitle from "@/shared/components/text/CardTitle";
import DishDescModal from "./DishDescModal";
import TellRestaurantAboutAllergy from "./TellRestaurantAboutAllergy";
import QuantityModal from "./QuantityModal";
import ModalButtons from "./ModalButtons";
import Line from "@/shared/components/Line";
import Selection from "./Selection";
import ControSelectedQtyProvider from "@/features/store/contexts/ControlSelectedQtyProvider";

export default function DishInfoModal({
  isModal,
}: {
  isModal: boolean | undefined;
  }) {
  
  const fakeArr = Array.from({length:5})
  return (
    <div className="flex w-full h-full mt-96 flex-col justify-center space-y-6 px-4 lg:w-[50%] lg:px-0">
      <DishDescModal />
      <Line />

      <div className="space-y-4">
        {fakeArr.map((_, i) => (
          <ControSelectedQtyProvider key={i}>
            <Selection
              min={1}
              max={9} // selection have its own min and max e.g you can not selected morethan 9 slices of meat
             
              title="Add Some Sauce?"
              status="Required"
              chooseAmt={9}
              selectionType={
                i >= 0 && i < 2 ? "qty" : i >= 2 && i < 4 ? "radio" : "checkBox"
              }
            />
          </ControSelectedQtyProvider>
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
