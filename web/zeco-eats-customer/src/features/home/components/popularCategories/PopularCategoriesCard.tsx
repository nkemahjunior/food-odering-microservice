import CardTitle from "@/shared/components/text/CardTitle";
import Image from "next/image";

 
 
export default function PopularCategoriesCard() {
    return (
      <div className="mx-auto h-fit w-full overflow-hidden rounded-lg border-2 border-solid border-backgroundBorder">
        <div className="relative h-[12rem] w-full md:h-[13rem] lg:h-[20rem] xl:h-[18rem] 2xl:h-[14rem]">
          <Image
            alt=" picture of one ZecoEats popular Categories"
            src={"/devImages/food1.webp"}
            quality={100}
            style={{
              objectFit: "cover",
            }}
            fill
          />
        </div>

        <div className="flex h-[4rem] items-center bg-inherit md:h-[5rem] xl:bg-background">
          <div className="ml-2 2xl:ml-4">
            {/* <p className="text-lg font-medium text-secondary ">
              Pasta & Casuals
            </p> */}
            <CardTitle text="Pasta & Casuals" textColor="text-secondary "/>
            <p className=" text-primary ">
              4 Restaurants
            </p>
          </div>
        </div>
      </div>
    );
}