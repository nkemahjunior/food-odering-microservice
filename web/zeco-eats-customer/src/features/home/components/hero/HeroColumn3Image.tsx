import Image from "next/image";

 
 
export default function HeroColumn3Image() {
  return (
    <div className="relative bottom-0 h-full w-full">
      <Image
        className=" "
        src={"/hero/heroImg2.png"}
        fill={true}
        alt="hero image 2"
        quality={100}
      />
    </div>
  );
}