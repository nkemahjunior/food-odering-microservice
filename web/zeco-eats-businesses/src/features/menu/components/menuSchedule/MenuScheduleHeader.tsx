import Heading from "@/shared/components/text/Heading";

export default function MenuScheduleHeader() {
  return (
    <div className="">
      <Heading
        text={`San siro Menu`}
        className="border-2 border-solid border-transparent"
      />
      {/* <p className="flex items-center gap-x-2 text-textTint">
        <span>Monday - Friday</span>
        <span>6:00 AM - 10:00 PM</span>
      </p> */}
    </div>
  );
}
