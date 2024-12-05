import { useEffect } from "react";

export const usePreventScrolling = (disableScrolling: boolean) => {
  useEffect(() => {
    if (disableScrolling) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [disableScrolling]);
};
