"use client";
import Button from "@/shared/components/button/Button";
import { useState } from "react";
import EditSchedule from "./EditSchedule";
import ScheduleChart from "./ScheduleChart";


//   const extractTime = (time: string) => {
//     return time.split(":"); // [hours, min, sec]
//   };

export default function MenuSchedule() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing((v) => !v);
  };

  return (
    <div className="w-full space-y-12">
      <div>
        <Button events={{ onClick: toggleIsEditing }}>
          {isEditing ? "Save" : "Edit Schedule"}
        </Button>
      </div>

      {isEditing ? <EditSchedule /> : <ScheduleChart />}
    </div>
  );
}
