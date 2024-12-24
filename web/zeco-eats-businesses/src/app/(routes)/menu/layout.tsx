import MenuNav from "@/features/menu/components/nav/MenuNav";

 
 
export default function MenuLayout({children}: {children:React.ReactNode}) {
    return (
        <div className=" space-y-8" >
            <MenuNav/>
            {children}
        </div>
    );
}