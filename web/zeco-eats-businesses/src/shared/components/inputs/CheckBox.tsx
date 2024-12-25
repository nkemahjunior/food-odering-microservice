export default function CheckBox({  id }: {  id: string }) {
  return (
    <div className="border-secondary has-[:checked]:bg-secondary flex h-[1.6rem] w-[1.6rem] items-center justify-center border-2 border-solid">
      <input
        type="checkbox"
        id={id}
        className="checked:accent-secondary h-full w-full cursor-pointer appearance-none checked:appearance-auto"
      />
    </div>
  );
}
