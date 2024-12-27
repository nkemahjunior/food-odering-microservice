import Line from "@/shared/components/Line";
import MenuScheduleHeader from "../components/menuSchedule/MenuScheduleHeader";
import MenuSchedule from "../components/menuSchedule/MenuSchedule";

 
 
export default function MenuSchduleUi() {
    return (
      <div className=" space-y-8">
        <MenuScheduleHeader />
        <Line />
        <MenuSchedule/>
      </div>
    );
}