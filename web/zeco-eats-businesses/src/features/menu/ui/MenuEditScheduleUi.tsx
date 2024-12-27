import Line from "@/shared/components/Line";
import MenuScheduleHeader from "../components/menuSchedule/MenuScheduleHeader";
import EditSchedule from "../components/menuSchedule/EditSchedule";

 
 
export default function MenuEditSchduleUi() {
    return (
      <div className=" space-y-8">
        <MenuScheduleHeader />
        <Line />
        <EditSchedule/>
      </div>
    );
}