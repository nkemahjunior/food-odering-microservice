import MenuNav from "@/features/menu/components/nav/MenuNav";

 
 
export default function MenuLayout({children}: {children:React.ReactNode}) {
    return (
        <div >
            <MenuNav/>
            {children}
        </div>
    );
}