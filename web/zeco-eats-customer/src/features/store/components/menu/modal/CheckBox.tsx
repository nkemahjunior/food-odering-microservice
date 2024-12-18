 
 
export default function CheckBox({ name, id }: { name: string; id: string }) {
  return (
    <div className="flex h-[1.6rem] w-[1.6rem] items-center justify-center border-2 border-solid border-secondary has-[:checked]:bg-secondary">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="h-full w-full cursor-pointer appearance-none checked:appearance-auto checked:accent-secondary"
      />
    </div>
  );
}