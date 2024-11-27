import Image from "next/image";

 
 
export default function HeroColumn2() {
  return (
    <div className="z-10 hidden  xl:-ml-32 xl:block 2xl:-ml-44">
      <div className="relative h-full w-full ">
        <Image
          src={"/hero/heroImg1.webp"}
          fill={true}
          alt="hero image 1"
          quality={100}
        />
      </div>
    </div>
  );
}