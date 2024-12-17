import { useRouter, useSearchParams } from "next/navigation";

export function useUpdateUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params}`);
  };
    
    
}
