export default function ItemTitle({
  item,
}: {
  item: string;
}) {
  return (
    <div className="flex flex-col justify-center">
      <span className="font-medium">{item}</span>
      {/* <span className="text-textTint">{desc} items</span> */}
    </div>
  );
}