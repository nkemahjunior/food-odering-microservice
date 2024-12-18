 
 "use client"

import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

export default function ButtonBackUrl() {
    const router = useRouter()
    return (
      <button
        className="flex items-center justify-center rounded-full bg-background p-2 hover:bg-backgroundShade1"
        onClick={() => router?.back()}
      >
        <span>
          <RxCross2 size={20} />
        </span>
      </button>
    );
}