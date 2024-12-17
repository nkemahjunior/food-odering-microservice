
import SelectionItem from "./SelectionItem";
import SelectionTitle from "./SelectionTitle";


interface fnProps {
  title: string;
  status: string;
  chooseAmt: number;
  selectionType: "qty" | "radio" | "checkBox" 
}

export default function Selection({ title, status, chooseAmt, selectionType }: fnProps) {
  const fakeArr = Array.from({ length: 3 });
  return (
    <div>
      <SelectionTitle
        title={title}
        status={status}
        chooseAmt={chooseAmt}
      />

      <div className="space-y-4">
        {fakeArr.map((el, i) => (
          <SelectionItem key={i} i={i} selectionType={selectionType} />
        ))}
      </div>
    </div>
  );
}
