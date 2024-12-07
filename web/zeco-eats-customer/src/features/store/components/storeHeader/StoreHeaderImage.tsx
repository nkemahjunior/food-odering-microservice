import Image from "next/image";

export default function StoreHeaderImage() {
  return (
    <div className="w-full">
      <div className="relative h-[8rem] w-full lg:h-[20rem] lg:overflow-hidden lg:rounded-lg">
        <Image
          src={"/devImages/food1.webp"}
          alt="header picture of this restaurant"
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
