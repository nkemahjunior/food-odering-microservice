import Line from "@/shared/components/Line";
import MenuScheduleHeader from "../components/menuSchedule/MenuScheduleHeader";
import ScheduleChart from "../components/menuSchedule/ScheduleChart";

 
 
export default function MenuSchduleUi() {
    return (
      <div className=" space-y-8">
        <MenuScheduleHeader />
        <Line />
        <ScheduleChart/>
      </div>
    );
}