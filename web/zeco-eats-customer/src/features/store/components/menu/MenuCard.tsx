import CardTitle from "@/shared/components/text/CardTitle";
import Image from "next/image";

export default function MenuCard() {
  return (
    <div className="flex h-[10rem] w-full overflow-hidden rounded-lg border-solid border-backgroundBorder border-[1px] ">
      <div className="w-[70%] space-y-1  p-4">
        <CardTitle text="Chilli sunny side up" className="capitalize" />
        <p className="">£13.00</p>
        <p className="text-storeTextColorTint">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          vero laboriosam deleniti ex sit voluptatibus </p>
      </div>

      <div className="h-full relative w-[30.1%] ">
        <Image
          src={"/devImages/food1.webp"}
          alt="picture of dish"
          fill
          quality={100}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
