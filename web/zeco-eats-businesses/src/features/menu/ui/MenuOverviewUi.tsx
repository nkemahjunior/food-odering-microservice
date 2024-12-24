import Line from "@/shared/components/Line";
import MenuHours from "../components/overview/MenuHours";
import MenuTitle from "../components/overview/MenuTitle";

export default function MenuOverviewUi() {
  return (
    <div className=" space-y-8">
          <MenuTitle />
          <MenuHours />
          <Line/>
    </div>
  );
}
