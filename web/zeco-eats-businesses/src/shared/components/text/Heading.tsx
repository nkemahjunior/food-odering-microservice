 
 
export default function Heading({
  text,
  textColor = "text-black",
  className
}: {
  text: string;
  textColor?: string;
  className?:string
}) {
  return (
    <>
      <h1
        className={`text-xl font-bold lg:text-2xl ${textColor}  ${className}`}
      >
        {text}
      </h1>
    </>
  );
}