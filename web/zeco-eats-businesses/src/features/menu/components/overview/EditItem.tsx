"use client";
import Line from "@/shared/components/Line";
import EditOptionParent from "./EditOptionParent";
import EditItemInput from "./EditItemInput";
import EditItemPhoto from "./EditItemPhoto";
import EditItemDesc from "./EditItemDesc";
import EditItemSoldOut from "./EditItemSoldOut";
import EditItemSaveBtn from "./EditItemSaveBtn";
import EditItemHeader from "./EditItemHeader";
import EditItemCategories from "./EditItemCategories";

export default function EditItem() {
  return (
    <div className="w-full space-y-4 px-8 py-4">
      <EditItemHeader />
      <Line />

      <div className="space-y-6">
        <EditOptionParent>
          <EditItemInput
            id="itemName"
            label="Name"
            initialState={`Fried Rice`}
            className="space-y-2"
          />
        </EditOptionParent>

        <EditItemPhoto />
        <EditItemDesc />
        <EditItemSoldOut />
        <Line />

        <EditItemCategories />

        <EditItemInput
          id="itemPrice"
          label="Price"
          initialState={`£122`}
          className="flex items-center justify-between"
          inputWidth="w-[10rem]"
        />

        <EditItemInput
          id="itemVat"
          label="VAT"
          initialState={`£1`}
          className="flex items-center justify-between"
          inputWidth="w-[10rem]"
        />

        <EditItemSaveBtn
          className="bg-secondary flex w-full items-center justify-center text-white"
          hoverColor="hover:bg-secondaryTint"
          px="px-0"
        />
      </div>
    </div>
  );
}
