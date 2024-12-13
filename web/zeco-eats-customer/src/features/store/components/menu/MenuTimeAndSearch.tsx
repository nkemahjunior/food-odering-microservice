import MenuSearch from "./MenuSearch";

 
 
export default function MenuTimeAndSearch() {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Menu</p>
          <p className="text-storeTextColorTint">9:00 AM - 5:30 PM</p>
            </div>
            <MenuSearch/>
      </div>
    );
}