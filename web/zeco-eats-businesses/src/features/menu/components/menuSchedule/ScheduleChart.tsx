import {
  colorTimePoint,
  convert24HrTo12Hr,
  createHours,
  createTimePoints,
} from "../../utils/menuUtils";

import LinkButton from "@/shared/components/button/LinkButton";

const fakeData = [
  { day: "Monday", startTime: "09:00:00", endTime: "12:30:00" },
  { day: "Tuesday", startTime: "10:00:00", endTime: "13:45:00" },
  { day: "Wednesday", startTime: "08:15:00", endTime: "11:00:00" },
  { day: "Thursday", startTime: "14:00:00", endTime: "17:30:00" },
  { day: "Friday", startTime: "13:00:00", endTime: "16:15:00" },
  { day: "Saturday", startTime: "00:00:00", endTime: "10:45:00" },
  { day: "Sunday", startTime: "11:00:00", endTime: "24:00:00" },
];

//   const extractTime = (time: string) => {
//     return time.split(":"); // [hours, min, sec]
//   };

export default function ScheduleChart() {
  return (
    <div className="w-full space-y-12">
      <div>
        <LinkButton href="schedule/edit">Edit Schedule</LinkButton>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr className="">
              <th className=""></th>
              {createHours().map((el, i) => (
                <th key={i} className={`pb-2 text-start text-textTint`}>
                  <div className="-ml-4">
                    <span>{el === 0 ? 12 : convert24HrTo12Hr(el)}</span>
                    <span className="pl-1">
                      {el < 12 ? "am" : el === 24 ? "am" : "pm"}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="w-full bg-background">
            {fakeData.map((restauHrs, i) => (
              <tr
                key={i}
                className="relative cursor-pointer border-b-[0px] border-solid border-backgroundBorder transition-colors duration-300 last:border-b-0 hover:bg-background"
              >
                <td className="h-16 w-[8rem] border-r-[1px] border-solid border-backgroundBorder bg-backgroundShade2 py-6 pl-4">
                  {restauHrs.day}
                </td>

                {createHours().map((hour, tdIx) => (
                  <td
                    key={tdIx}
                    className={`h-16 ${hour === 24 ? "w-[10rem] bg-white px-2" : ""} border-r-[1px] border-solid border-backgroundBorder py-6 last:border-r-0`}
                  >
                    <div
                      className={`flex h-full w-full items-center ${hour === 24 ? "hidden" : ""}`}
                    >
                      {createTimePoints(hour, 6).map((timePoint, tpIdx) => (
                        <span
                          key={tpIdx}
                          className={`inline-block h-full w-full ${colorTimePoint(restauHrs.startTime, restauHrs.endTime, timePoint) && "bg-primary"}`}
                        ></span>
                      ))}
                    </div>

                    {hour === 24 && (
                      <div className="font-medium text-secondary">
                        {restauHrs.startTime} - {restauHrs.endTime}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
