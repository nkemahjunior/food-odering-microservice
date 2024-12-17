import StoreModalUrl from "@/features/store/components/menu/modal/StoreModalUrl";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StoreModalUrl />
      {children}
    </>
  );
}
