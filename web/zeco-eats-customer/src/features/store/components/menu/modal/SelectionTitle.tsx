import CardTitle from "@/shared/components/text/CardTitle";
import SelectionStatus from "./SelectionStatus";

 
 
export default function SelectionTitle({title, status, chooseAmt}:{title:string, status:string, chooseAmt:number}) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <CardTitle
            text={`${title}`}
            className="font-semibold"
          />
          <SelectionStatus status={`${status}`} />
        </div>
            <p className="text-storeTextColorTint">Choose { chooseAmt}</p>
      </div>
    );
}