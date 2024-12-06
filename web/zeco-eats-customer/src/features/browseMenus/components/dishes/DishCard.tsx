import Image from "next/image";

 
 
export default function DishCard() {
return (
  <div className="gw-[20rem] md: w-full space-y-4 border-0 border-solid border-purple-600">
    <div className="relative h-[8rem] w-full border-0 border-solid border-red-600 rounded-lg overflow-hidden">
      <Image
        alt="food's image"
        src={"/devImages/food1.webp"}
        fill
        quality={100}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
    <div className="flex w-full items-center justify-between border-0 border-solid border-green-600">
      <div className="space-y-1">
        <p className="capitalize text-lg font-medium">Master wings</p>
        <p className=" text-stone-400">20-30 min</p>
      </div>

      <div className="rounded-full bg-backgroundShade2 p-2 text-xs">4.0</div>
    </div>
  </div>
);
}