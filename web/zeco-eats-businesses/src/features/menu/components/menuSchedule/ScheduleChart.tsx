import Button from "@/shared/components/button/Button";

export default function ScheduleChart() {
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

  const createHours = () => {
    let initialHour = 0;
    return Array.from({ length: 24 / 3 + 1 }, () => {
      const hour = initialHour;
      initialHour = initialHour + 3;
      return hour;
    });
  };

  const convert24HrTo12Hr = (hour: number) => {
    if (hour <= 12) return hour;
    else return hour - 12;
  };

  const createTimePoints = (initialHour: number): string[] => {
    if (initialHour === 24) return [`24:00:00`]; // next day 12 am. 00:00 will mean 12 am same day when converted by date object
    let initialMin = 0;
    //5 points in 3hr gap
    return Array.from({ length: 6 }, () => {
      const time = `${initialHour < 10 ? `0${initialHour}` : initialHour}:${initialMin < 10 ? `0${initialMin}` : initialMin}:00`;
      initialHour = initialMin === 0 ? initialHour : initialHour + 1;
      initialMin = initialMin === 0 ? 30 : 0;
      return time;
    });
  };

  const colorTimePoint = (
    restauStart: string,
    restauEnd: string,
    timePointTime: string,
  ) => {
    const startTime = new Date(`1970-01-01T${restauStart}`); //Z
    const endTime = new Date(`1970-01-01T${restauEnd}`);
    const timePoint = new Date(`1970-01-01T${timePointTime}`);

    return (
      (timePoint >= startTime && timePoint <= endTime) ||
      (timePoint >= startTime &&
        endTime.getHours() === 0 &&
        endTime.getMinutes() === 0)
    );
  };

  return (
    <div className="w-full space-y-12">
      <div>
        <Button>Edit Schedule</Button>
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
                      {createTimePoints(hour).map((timePoint, tpIdx) => (
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
//el > 12 ? el - 12 : el
