import CloseBtn from "@/shared/components/modal/CloseBtn";
import Heading2 from "@/shared/components/text/Heading2";
import EditItemSaveBtn from "./EditItemSaveBtn";

export default function EditItemHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <CloseBtn />
        <Heading2 text="Edit Item" />
      </div>

      <EditItemSaveBtn />
    </div>
  );
}
