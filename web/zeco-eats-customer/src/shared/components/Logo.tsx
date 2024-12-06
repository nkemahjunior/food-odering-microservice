interface fnProps {
  text1Size: string;

}

export default function ({ text1Size }: fnProps) {
  return (
    <div className=" p-2e font-extrabold text-secondary  ">
      <div className={`${text1Size}`}>Zeco Eats</div>
      {/* <div
        className={`-rotate-90 bg-primary px-[0.20rem] ${padding} ${text2Size}`}
      >
        cm
      </div> */}
    </div>
  );
}
