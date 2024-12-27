"use client";
import Heading2 from "@/shared/components/text/Heading2";
import {
  convert24HrTo12Hr,
  createHours,
  createTimePoints,
} from "../../utils/menuUtils";
import WeekDay from "./WeekDay";
import CustomSelect from "@/shared/components/inputs/CustomSelect";
import { useState } from "react";

const daysOfTheWeek = [
  "Monday",
  "Tuesay",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function EditSchedule() {
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  return (
    <div className="h-[20rem] w-full space-y-8 border-2 border-solid border-red-600">
      <div className="flex items-center">
        {daysOfTheWeek.map((el, i) => (
          <WeekDay key={i} day={el} />
        ))}
      </div>
      <div>
        <div className="flex items-center">
          {createHours().map((hour, i) => (
            <div
              key={i}
              className="flex h-12 w-full items-center border-r border-solid border-yellow-500 bg-background first:border-l last:border-r-0"
            >
              {createTimePoints(hour, 6).map((timePoint, tpIdx) => (
                <span
                  key={tpIdx}
                  className={`block h-full w-full border-2 border-solid border-teal-500 ${"" /*colorTimePoint(restauHrs.startTime, restauHrs.endTime, timePoint) && "bg-primary"*/}`}
                ></span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          {createHours().map((el, i) => (
            <div key={i} className="-ml-2 w-full">
              <span>{el === 0 ? 12 : convert24HrTo12Hr(el)}</span>
              <span className="pl-1">
                {el < 12 ? "am" : el === 24 ? "am" : "pm"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-x-20">
        <div className="space-y-4">
          <Heading2 text="Start time" />
          <CustomSelect
            data={createTimePoints(0, 49)}
            onchange={setSelectedStartTime}
          />
        </div>
        <div className="space-y-4">
          <Heading2 text="End time" />
          <CustomSelect
            data={createTimePoints(0, 49)}
            onchange={setSelectedEndTime}
          />
        </div>

     
      </div>
    </div>
  );
}
