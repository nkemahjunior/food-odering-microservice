export default function OpeningDayAndTime({ day, time}:{day:string, time:string}) {
  return (
    <div className="flex w-full pl-[5rem]">
      <div className="">
              <p className="text-base font-medium">{day}</p>
              <p className="text-storeTextColorTint">{time}</p>
      </div>
    </div>
  );
}
