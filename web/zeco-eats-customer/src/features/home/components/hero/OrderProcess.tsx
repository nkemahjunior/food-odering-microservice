import Logo from "@/shared/components/Logo";

interface fnProps {
  processNum: number;
  processDetail1: string;
  processDetail2: string;
}
 
 
export default function OrderProcess({processNum, processDetail1, processDetail2}: fnProps) {
    return (
      <div className="h-fit w-[18rem]  2xl:w-[22rem]">
        <p className="outline-text-cst -mb-4 mr-8 text-end text-6xl font-semibold">
          {processNum}
        </p>
        <div className="z-10 flex h-[4.3rem] w-full justify-between rounded-xl  bg-white px-4 py-1 shadow-sm 2xl:h-[4.7rem] 2xl:py-2">
          <div className="space-y-1">
            <Logo
              text1Size="text-xs "
            />
            <p className="text-xs font-semibold">{processDetail1}</p>
            <p className="text-xs">{processDetail2} </p>
          </div>

          <div>
            <p className="text-xs text-stone-400">now</p>
          </div>
        </div>
      </div>
    );
}