"use client";
import { createContext, useState } from "react";

export interface contextTypes {
  showModalParam: Record<"paramKey" | "paramId", string>;
  // setShowModalParam: (arg: { paramKey: string; paramId: string }) => void;
  setShowModalParam: (arg: Record<"paramKey" | "paramId", string>) => void;

  modalContent: React.ReactNode;
  setModalContent: (arg: React.ReactNode) => void;
}

export const ModalUrlContext = createContext<contextTypes | null>(null);

export default function ModalUrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModalParam, setShowModalParam] = useState({
    paramKey: "",
    paramId: "",
  });

  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  return (
    <ModalUrlContext.Provider
      value={{
        showModalParam,
        setShowModalParam,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </ModalUrlContext.Provider>
  );
}
