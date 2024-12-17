export default function RadioBtn({name, id}:{name:string, id:string}) {
  return (
    <label
      htmlFor={id}
      className="relative flex h-[1.4rem] w-[1.4rem] items-center justify-center rounded-full has-[:checked]:bg-secondary has-[:checked]:ring-4 has-[:checked]:ring-secondary"
    >
      <input
        id={id}
        name={name}
        type="radio"
        className="h-full w-full cursor-pointer appearance-none rounded-full border-2 border-solid border-secondary bg-white accent-white transition-colors duration-300 checked:h-3  checked:w-3"
      />
    </label>
  );
}
