import CheckBox from "@/shared/components/inputs/CheckBox";

 
 
export default function EditItemSoldOut() {
    return (
        <div className="flex items-center space-x-4">
          <CheckBox id="itemSoldOut" />
          <label htmlFor="itemSoldOut" className="font-medium">
            Sold Out
          </label>
        </div>
    );
}