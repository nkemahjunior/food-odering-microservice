 "use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

 
export default function ({children, session}:{children:ReactNode, session:Session | null}) {
    return (
        <SessionProvider session={session} /*refetchOnWindowFocus={true} the default*/ /*refetchInterval={}*/>
            {children}
        </SessionProvider>
    );
}