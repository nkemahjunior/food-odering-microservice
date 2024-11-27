export default function TabHeading({ text }: { text: string }) {
  return (
    <div className=" bg-primary flex items-center justify-center rounded-3xl px-12 py-4">
      <p className=" font-bold text-lg text-secondary">{text}</p>
    </div>
  );
}
