import Heading2 from "@/shared/components/text/Heading2";

import QuickActions from "./QuickActions";
import SalesChart from "./SalesChart";
import SummaryTopics from "./SummaryTopics";
import BestSellingItemsTable from "./BestSellingItemsTable";

export default function Home() {
  return (
    <div className="space-y-8 pb-16">
      <div>
        <p className="text-textTint">Good morning Chris</p>
        <Heading2 text="Today's Summary" />
      </div>

      <SummaryTopics />

      <div className="grid grid-cols-[40fr,40fr,20fr] gap-x-20 border-0 border-solid border-green-700">
        <SalesChart />
        <SalesChart />
        <QuickActions />
      </div>

      <div className="grid grid-cols-2 gap-x-16">
        <SalesChart />
        {/* <SalesChart /> */}
        <BestSellingItemsTable/>
      </div>
    </div>
  );
}
