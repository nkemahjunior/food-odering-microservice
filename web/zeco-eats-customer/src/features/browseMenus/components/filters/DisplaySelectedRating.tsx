 
 
export default function DisplaySelectedRating({ selectedValue }: { selectedValue: string }) {
  return (
    <div>
      <p className=" ">
        {selectedValue == "5"
          ? "Only 5"
          : `Over ${selectedValue}`}
      </p>
    </div>
  );
}