 "use client"

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

 
export default function BackToRestaurantModal({isModal}:{isModal:boolean | undefined}) {

    const router = useRouter()

    return (
      <button
        className={`${!isModal ? "hidden items-center lg:flex" : "hidden"} sticky mb-4 w-full space-x-2 font-medium`}
        onClick={() => {
          router.back();
        }}
      >
        <span>
          <BiArrowBack />
        </span>
        <span>Back to restaurant name</span>
      </button>
    );
}