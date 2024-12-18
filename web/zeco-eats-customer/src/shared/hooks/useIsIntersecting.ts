import { useEffect, useState } from "react";



export function useIsIntersecting(
  ref: React.RefObject<HTMLElement>,
  initial: boolean,
  options: IntersectionObserverInit = {},
  dependencies: any[] = [],
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(initial);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const element = ref.current;
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, options, ...dependencies]);

  return isIntersecting;
}


