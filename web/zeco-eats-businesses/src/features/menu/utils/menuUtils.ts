export const createHours = () => {
  let initialHour = 0;

  const minOpenDuration = 3;
  const hrsInADay = 24;

  return Array.from({ length: hrsInADay / minOpenDuration + 1 }, () => {
    const hour = initialHour;
    initialHour = initialHour + minOpenDuration;
    return hour;
  });
};

export const convert24HrTo12Hr = (hour: number) => {
  if (hour <= 12) return hour;
  else return hour - 12;
};

export const createTimePoints = (initialHour: number, length:number): string[] => {
  if (initialHour === 24) return [`24:00:00`]; // next day 12 am. 00:00 will mean 12 am same day when converted by date object
  let initialMin = 0;
  //6 points in 3hr gap
  return Array.from({ length: length }, () => {
    const time = `${initialHour < 10 ? `0${initialHour}` : initialHour}:${initialMin < 10 ? `0${initialMin}` : initialMin}:00`;
    initialHour = initialMin === 0 ? initialHour : initialHour + 1;
    initialMin = initialMin === 0 ? 30 : 0;
    return time;
  });
};


// const generateStartAndEndTime = () => {

//     let initialHour = 0
//     let initialMin = 0
//     return Array.from({ length: 48 }, () => {
//         const time = {
//             start: `${initialHour < 10 ? `0${initialHour}` : initialHour}:${initialMin < 10 ? `0${initialMin}` : initialMin}:00`,
//             end:''
//         }
//     })
// }

export const colorTimePoint = (
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
