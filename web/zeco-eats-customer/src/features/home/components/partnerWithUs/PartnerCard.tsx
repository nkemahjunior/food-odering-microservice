import Image from "next/image";
import Link from "next/link";

interface fnProps {
  details: {
    imagePath: string;
    title: string;
    signupText: string;
    signupText2: string;
  };
}

export default function PartnerCard({ details }: fnProps) {
  return (
    //after:content-['*']
    <div className="relative h-[15rem] w-full  md:h-[24rem] lg:h-[28rem] rounded-lg overflow-hidden">
      <div className="absolute inset-0 z-10  bg-gradient-to-tr from-[rgba(3,8,31,0.9)] from-25% via-transparent to-transparent"></div>
      <div className="absolute top-0 z-20 ml-[1.5rem] flex h-[2rem] w-[12rem] items-center justify-center rounded-b-lg bg-white md:ml-[3rem] 2xl:ml-[6rem] md:h-[4rem] md:w-[18rem] ">
        <p className="text-sm font-bold text-secondary md:text-lg">
          {details.title}
        </p>
      </div>
      <div className="absolute bottom-4 z-20 ml-[1.5rem] space-y-3 md:bottom-8 md:ml-[3rem] 2xl:ml-[6rem] md:space-y-6">
        <div className="space-y-1 md:space-y-2">
          <p className="text-base font-medium text-primary md:text-lg">
            {details.signupText}
          </p>
          <p className="text-2xl font-bold text-white md:text-5xl">
            {details.signupText2}
          </p>
        </div>
        <Link
          href={"/signup---"}
          className="block w-[8rem] rounded-3xl bg-primary py-2 text-center text-xs font-medium text-white md:w-[12rem] md:py-4 md:text-lg"
        >
          Get Started
        </Link>
      </div>
      <Image
        alt="picture of a restaurant partner"
        src={details.imagePath}
        quality={100}
        fill
      />
    </div>
  );
}
