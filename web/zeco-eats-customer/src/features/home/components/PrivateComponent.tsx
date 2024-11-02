 "use client"

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

 
export default function PrivateComponent() {

    const router = useRouter()
    const session = useSession()


    async function logout(){
        try {


            // signout on client app
            await signOut({redirect:false})


            /**
             * @see  https://openid.net/specs/openid-connect-core-1_0.html
             *  @see https://openid.net/specs/openid-connect-rpinitiated-1_0.html#RPLogout
            */


            const record:Record<string, string>  = {
                id_token_hint : session.data?.idToken!,
                logout_hint : session.data?.user?.email!,
                post_logout_redirect_uri:"http://localhost:3000" // adding this field will make the authorisation server redirect you back when you logout
            }

            const serializedUriQueryString = new URLSearchParams(record)  
            //redirect user to keycloak authoriation server so they can accept the consent and logout
            router.push(`${process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout/?${serializedUriQueryString}`)


            
        }catch(error){

            console.log(error)
            //signOut({redirect:false})
            //location.replace("/")
        }
    }




    return (
        <div className="flex items-center justify-center h-screen flex-col gap-y-6">

            <div>how are you doing today</div>
            

            <button className=" px-6 py-4 rounded-lg border-solid border-2 border-emerald-950"
            onClick={() => logout()}
            >Sign out</button>


            {/* <button className=" px-6 py-4 rounded-lg border-solid border-2 border-emerald-950"
            onClick={() => logout()}
            >Get some data from resource server</button> */}

            {/* <button popoverTarget=""></button> */}

            
        </div>
    );
}