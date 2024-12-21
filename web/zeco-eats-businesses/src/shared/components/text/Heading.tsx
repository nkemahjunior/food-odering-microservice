 
 
export default function Heading({
  text,
  textColor = "text-black",
  style,
}: {
  text: string;
  textColor?: string;
  style?: string;
}) {
  return (
    <>
      <h1
        className={`text-xl font-bold lg:text-2xl ${textColor} ${style}`}
      >
        {text}
      </h1>
    </>
  );
}