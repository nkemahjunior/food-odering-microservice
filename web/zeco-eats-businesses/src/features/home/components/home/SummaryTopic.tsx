import Heading2 from "@/shared/components/text/Heading2";
import { FiTrendingUp } from "react-icons/fi";


export default function SummaryTopic({
    
  topic,
  amt,
}: {
  topic: string;
  amt: string;
}) {
  return (
    <div className="w-full space-y-2 rounded-lg border-[1px] border-solid border-backgroundBorder py-4 pl-4">
      <span className="text-textTint">{topic}</span>
      <span>
        <Heading2 text={amt} />
      </span>
      <div className="flex w-full items-center space-x-2">
        <div className="flex items-center space-x-1 rounded-sm bg-green-300 py-1 px-2 text-green-900">
          <span>
            <FiTrendingUp />
          </span>
          <span>12,23%</span>
        </div>
        <span className="text-textTint">Compared to last month</span>
      </div>
    </div>
  );
}
