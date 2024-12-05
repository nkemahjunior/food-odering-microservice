 
 
export default function SectionTitle({
  titleSM,
  titleMD,
}: {
  titleSM: string;
  titleMD?: string;
}) {
  return (
    <div className="">
      <p className=" text-2xl font-bold">{titleSM}</p>
      {/**className="mb-2 text-center text-3xl md:text-4xl font-semibold text-primary xl:mb-0 xl:text-start xl:text-5xl 2xl:text-6xl" */}
      {/* <p className="hidden text-2xl font-bold md:block xl:text-3xl 2xl:text-4xl">
        {titleMD !== undefined ? titleMD : titleSM}
      </p> */}
    </div>
  );
}