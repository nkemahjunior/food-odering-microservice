import { BiLocationPlus } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";

 
 
export default function StoreLocationItem () {
    return (
      <div className="flex">
        <div className="flex basis-[20%] items-center justify-center">
          <span>
            <BiLocationPlus size={20} />
          </span>
        </div>
        <div className="flex basis-[80%] border-b-[1px] border-solid border-backgroundBorder py-2">
          <div className="basis-[80%]">
            <p className="text-base font-medium">19 New Row</p>
            <p className="text-storeTextColorTint">London, Emea</p>
          </div>
          <div className="flex basis-[20%] items-center justify-center">
            <button>
              <BsCopy size={20} />
            </button>
          </div>
        </div>
      </div>
    );
}
//overflow-hidden text-ellipsis whitespace-nowrap  w-10

/**
 *   const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
 */