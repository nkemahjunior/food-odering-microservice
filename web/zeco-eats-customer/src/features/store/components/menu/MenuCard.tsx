import CardTitle from "@/shared/components/text/CardTitle";
import { clipText } from "@/shared/utils/clipText";
import Image from "next/image";

export default function MenuCard() {
  return (
    <div className="flex h-[10rem] w-full space-x-1 overflow-hidden border-solid border-backgroundBorder pb-4 pt-4 lg:h-[10rem] lg:divide-y-0 lg:rounded-lg lg:border-[1px] lg:pb-0 lg:pt-0">
      <div className="flex w-[60%] flex-col justify-center space-y-1 lg:w-[70%] lg:flex-none lg:p-4">
        <CardTitle
          text={clipText(`Chilli sunny side up  `, 40)}
          className="capitalize"
        />
        <p className="">£13.00</p>
        <p className="text-storeTextColorTint">
          {clipText(
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero laboriosam deleniti ex sit voluptatibus",
            53,
          )}
        </p>
      </div>

      <div className="relative h-full w-[40%] overflow-hidden rounded-lg lg:w-[30.1%] lg:rounded-none">
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
