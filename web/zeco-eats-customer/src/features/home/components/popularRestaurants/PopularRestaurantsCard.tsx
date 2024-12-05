import Image from "next/image";

export default function PopularRestaurantsCard() {
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

      <div className="flex h-[4rem] items-center bg-primary">
        <div className="ml-2 2xl:ml-4">
          <p className="text-lg font-medium text-white">
            Pasta & Casuals
          </p>
          {/* <p className="text-xs text-primary md:text-sm lg:text-base">
            4 Restaurants
          </p> */}
        </div>
      </div>
    </div>
  );
}
