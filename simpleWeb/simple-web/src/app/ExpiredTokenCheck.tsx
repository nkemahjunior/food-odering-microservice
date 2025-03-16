"use client";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ExpiredTokenCheck({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const { data } = useSession();

  if (data?.error === "RefreshAccessTokenError" && pathname != "/") {
    signIn("keycloak");
  }

  return <>{children}</>;

  /**
   * the jwt function at app/api/[...nextauth]/route.ts returns a session object with error= "RefreshAccessTokenError" if they were not able to refetch the token.. and that session object is gotten from the useSession() function
   *
   * if the token is succesfully refetched, a valid token is passed to the session
   */
}

/**
 * http://localhost:8080/realms/zeco-eats-realm/protocol/openid-connect/auth?response_type=code&client_id=zeco-eats-customer&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fkeycloak&code_challenge=JXQkCGbxMU7LwV8h9IArKsWTJ-kia1yGUBgkEfFCaWo&code_challenge_method=S256&scope=openid+profile+email
 */