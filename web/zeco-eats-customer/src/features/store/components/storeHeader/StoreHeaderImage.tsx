import Image from "next/image";

 
 
export default function StoreHeaderImage() {
  return (
    <div className="w-full">
      <div className="relative h-[20rem] w-full overflow-hidden rounded-lg border-2 border-solid border-red-600">
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