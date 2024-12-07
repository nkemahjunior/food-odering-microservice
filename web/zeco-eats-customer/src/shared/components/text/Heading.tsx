 
 
export default function Heading({
  text,
  textColor,
  style
}: {
    text: string;
    textColor?: string
  style?:string
}) {
  return (
    <>
      <h1
        className={` text-xl lg:text-2xl font-bold ${textColor ? textColor : "text-black"} ${style}`}
      >
        {text}
      </h1>
    </>
  );
}