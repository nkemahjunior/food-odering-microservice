import Image from "next/image";

 
 
export default function DishCard() {
return (
  <div className="w-[20rem] lg:w-full space-y-4 border-0 border-solid border-purple-600">
    <div className="relative h-[8rem] w-full border-0 border-solid border-red-600">
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
        <p className="capitalize">Master wings</p>
        <p className="text-sm ">20-30 min</p>
      </div>

      <div className="rounded-full bg-background p-2">4.0</div>
    </div>
  </div>
);
}