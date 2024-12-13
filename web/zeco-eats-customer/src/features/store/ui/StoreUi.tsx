
import Menu from "../components/menu/Menu";
import StoreHeader from "../components/storeHeader/StoreHeader";

 
 
export default function StoreUi() {
    return (
      <div className=" space-y-8">
        <StoreHeader />
        <div className="mx-sm  md:mx-md lg:mx-lg xl:mx-xl 2xl:mx-[14rem]">
          <Menu />
        </div>
      </div>
    );
}