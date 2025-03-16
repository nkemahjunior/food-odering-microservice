import { auth } from "../auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      const session = await auth()
    //if (!session) return <div>Not authenticated</div>
    
   
    console.log("***************************************************");
    console.log("***************************************************");
    console.log('in protected web');
    console.log(session);
    console.log("***************************************************");
    console.log("***************************************************");
  return (
   
      <div>{children}</div>
  );
}