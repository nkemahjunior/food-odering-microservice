import { signIn } from "@/app/auth"

 
export default function SignIn() {
  return (
    <form className=" h-screen flex justify-center items-center"
      action={async () => {
        "use server"
        await signIn("keycloak")
      }}
    >
      <button className=" px-4 py-3 rounded-lg bg-white text-black hover:bg-stone-200 cursor-pointer" type="submit">Signin with Keycloak</button>
    </form>
  )
} 