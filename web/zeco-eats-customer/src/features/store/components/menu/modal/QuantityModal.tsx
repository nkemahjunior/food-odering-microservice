 
 
export default function QuantityModal() {
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
    return (
      <div className="space-y-2">
        <p className="text-storeTextColorTint">You may be charged for extras</p>

        <div className="flex w-[5rem] items-center justify-center rounded-lg bg-backgroundShade1">
          <select name="" id="" className="w-[85%] py-2 outline-none">
            {numbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
}