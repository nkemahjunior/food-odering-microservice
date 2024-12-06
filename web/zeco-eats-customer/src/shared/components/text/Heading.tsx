 
 
export default function Heading({
  text,
  textColor
}: {
    text: string;
  textColor?: string
}) {
  return (
    <>
      <h1
        className={`text-2xl font-bold ${textColor ? textColor : "text-black"}`}
      >
        {text}
      </h1>
    </>
  );
}