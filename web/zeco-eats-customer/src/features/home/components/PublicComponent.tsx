"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

 
 
export default function PublicComponent() {

    const router = useRouter()



    return (
        <div className="flex items-center justify-center h-screen flex-col gap-y-8">
            

            <button className=" px-6 py-4 rounded-lg border-solid border-2 border-emerald-950"
            onClick={() => signIn("keycloak")}
            >Sign in</button>

             <button className=" px-6 py-4 rounded-lg border-solid border-2 border-emerald-950"
             onClick={  () => router.push(`${location.origin}/protected`)}
             >Access private route</button> 
        </div>
    );
}