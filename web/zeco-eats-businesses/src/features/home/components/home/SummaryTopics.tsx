import SummaryTopic from "./SummaryTopic";

export default function SummaryTopics() {
  return (
    <div className="flex space-x-4">
      <SummaryTopic topic="Sales" amt="$469.70" />
      <SummaryTopic topic="Orders" amt="$469.70" />
      <SummaryTopic topic="Average Ticket size" amt="$469.70" />
      <SummaryTopic topic="Best selling Items" amt="$469.70" />
    </div>
  );
}
