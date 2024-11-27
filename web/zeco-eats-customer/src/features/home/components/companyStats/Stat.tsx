 
 
export default function Stat({amount, stat, noBorder}:{amount:number, stat:string, noBorder?:boolean}) {
    return (
      <div
        className={`flex w-full flex-col items-center py-8 xl:py-0 xl:px-4 ${!noBorder && " border-b-2 xl:border-b-0  xl:border-r-2 border-solid border-white"} text-white`}
      >
        <p className="text-6xl font-light text-nowrap">{amount}+</p>
        <p className="text-2xl font-bold text-nowrap">{stat}</p>
      </div>
    );
}