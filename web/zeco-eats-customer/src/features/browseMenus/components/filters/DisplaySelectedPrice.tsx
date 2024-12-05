 
 
export default function DisplaySelectedPrice({selectedValue}:{selectedValue:string}) {
    return (
      <div>
        <p className=" ">
          {selectedValue == "4"
            ? "Any amount"
            : `Under £${selectedValue} Delivery`}
        </p>
      </div>
    );
}