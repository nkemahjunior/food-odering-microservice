import { useEffect } from "react";

export const usePreventScrolling = (disableScrolling: boolean | string | null) => {
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (disableScrolling) {
      document.body.classList.add("overflow-y-hidden");
      document.body.classList.add(`mr-[${scrollbarWidth}px]`);
    } else {
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.remove(`mr-[${scrollbarWidth}px]`);
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
      document.body.classList.remove(`mr-[${scrollbarWidth}px]`);
    };
  }, [disableScrolling]);
};
