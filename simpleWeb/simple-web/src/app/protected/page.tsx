import { signOut } from "../auth";


export default function Home() {
  return (
    <div className=" flex  flex-col gap-y-20 justify-center items-center h-screen">
      <div className=" text-2xl">protected resource</div>
      
      <form className=" "
            action={async () => {
              "use server"
              await signOut({redirectTo:'/'})
            }}
          >
            <button className=" px-4 py-3 rounded-lg bg-white text-black hover:bg-stone-200 cursor-pointer" type="submit">Signiout</button>
          </form>
   </div>
   );
}
