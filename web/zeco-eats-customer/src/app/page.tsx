import PublicComponent from "@/components/PublicComponent";
import { signIn } from "./auth";

 
 
export default function () {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-y-8">
        <PublicComponent/>
    </div>
);
}
