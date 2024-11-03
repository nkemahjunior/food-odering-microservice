"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PublicComponent() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-8">
      <button
        className="rounded-lg border-2 border-solid border-emerald-950 px-6 py-4"
        onClick={() => signIn("keycloak")}
      >
        Sign in
      </button>

      <button
        className="rounded-lg border-2 border-solid border-emerald-950 px-6 py-4"
        onClick={() => router.push(`${location.origin}/protected`)}
      >
        Access private route
      </button>
    </div>
  );
}
