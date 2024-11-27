import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookCircleFill, RiInstagramFill, RiTiktokFill } from "react-icons/ri";

 
 
export default function FooterSubscribe() {
    return (
      <div className="space-y-8">
        <h6 className="text-lg font-bold text-secondary">
          Get Exclusive Deals in your Inbox
        </h6>
        <div>
          <div className="flex">
            <input
              type="text"
              placeholder="youremail@gmail.com"
              className="h-[3rem] w-[15rem] rounded-3xl bg-stone-200 px-4 placeholder:text-sm placeholder:text-stone-500 lg:h-[3.5rem] lg:w-[20rem]"
            />
            <button className="-ml-10 h-[3rem] w-[10rem] rounded-3xl bg-primary font-medium text-white lg:h-[3.5rem] lg:w-[10rem] lg:text-lg">
              {" "}
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-secondary lg:ml-6 lg:text-start">
            we wont spam, read our{" "}
            <span>
              <Link className="underline" href={""}>
                email policy
              </Link>
            </span>
          </p>
          <div className="ml-6 mt-4 flex justify-center space-x-4 text-secondary lg:justify-normal">
            <Link href={""} className=" ">
              <RiFacebookCircleFill size={30} />
            </Link>
            <Link href={""} className=" ">
              <RiInstagramFill size={30} />
            </Link>
            <Link href={""} className=" ">
              <RiTiktokFill size={30} />
            </Link>
            <Link href={""} className=" ">
              <FaXTwitter size={30} />
            </Link>
          </div>
        </div>
      </div>
    );
}