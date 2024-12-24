"use client"
import Heading2 from "@/shared/components/text/Heading2";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

 
 
export default function SalesChart() {
const testData = [
  { day: "Nov 23", thisMonth: 500, lastMonth: 300 },
  { day: "Nov 24", thisMonth: 480, lastMonth: 280 },
  { day: "Nov 25", thisMonth: 460, lastMonth: 260 },
  { day: "Nov 26", thisMonth: 440, lastMonth: 240 },
  { day: "Nov 27", thisMonth: 420, lastMonth: 220 },
  { day: "Nov 28", thisMonth: 400, lastMonth: 200 },
  { day: "Nov 29", thisMonth: 380, lastMonth: 190 },
  { day: "Nov 30", thisMonth: 360, lastMonth: 180 },
  { day: "Dec 1", thisMonth: 350, lastMonth: 170 },
  { day: "Dec 2", thisMonth: 340, lastMonth: 160 },
  { day: "Dec 3", thisMonth: 330, lastMonth: 150 },
  { day: "Dec 4", thisMonth: 320, lastMonth: 140 },
  { day: "Dec 5", thisMonth: 340, lastMonth: 160 },
  { day: "Dec 6", thisMonth: 360, lastMonth: 180 },
  { day: "Dec 7", thisMonth: 380, lastMonth: 200 },
  { day: "Dec 8", thisMonth: 400, lastMonth: 220 },
  { day: "Dec 9", thisMonth: 420, lastMonth: 240 },
  { day: "Dec 10", thisMonth: 410, lastMonth: 230 },
  { day: "Dec 11", thisMonth: 390, lastMonth: 210 },
  { day: "Dec 12", thisMonth: 370, lastMonth: 190 },
  { day: "Dec 13", thisMonth: 350, lastMonth: 170 },
  { day: "Dec 14", thisMonth: 380, lastMonth: 190 },
  { day: "Dec 15", thisMonth: 420, lastMonth: 210 },
  { day: "Dec 16", thisMonth: 460, lastMonth: 230 },
  { day: "Dec 17", thisMonth: 480, lastMonth: 250 },
  { day: "Dec 18", thisMonth: 500, lastMonth: 270 },
  { day: "Dec 19", thisMonth: 520, lastMonth: 290 },
  { day: "Dec 20", thisMonth: 540, lastMonth: 310 },
  { day: "Dec 21", thisMonth: 580, lastMonth: 330 },
  { day: "Dec 22", thisMonth: 600, lastMonth: 350 },
];


    return (
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <Heading2 text="Sales" />
          <div className="w-fit rounded-lg bg-background p-2">
            <p>Last 30 days</p>
            {/* <select name="" id="" className="bg-inherit py-2 outline-none">
              <option value="">Today</option>
              <option value="">Last 30 days</option>
              <option value="">Last 15 days</option>
              <option value="">Last 7 days</option>
            </select> */}
          </div>
        </div>

        <div className="h-[25rem] w-full rounded-xl border-[1px] border-solid border-backgroundBorder p-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={testData}
             // margin={{ top: 20, right: 20, left: 40, bottom: 5 }}
            >
              <CartesianGrid
                horizontal={true}
                vertical={false}
                strokeDasharray="3 0"
              />

              <XAxis
                dataKey="day"
                stroke="black"
                //label={{ value: "month", position: "insideBottom", offset: -5 }}
                tickFormatter={(value /*index*/) =>
                  value === testData[0].day ||
                  value === testData[testData.length - 1].day
                    ? value
                    : ""
                }
                axisLine={false}
                interval="preserveStartEnd"
                tickLine={false}
                padding={{ left: 28, right: 10 }}
                tickMargin={10}
              />
              <YAxis
                stroke="black"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `£${value}`}
                //label={{ value: "Sales", angle: -55, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value) => `£${value}`}
                contentStyle={{
                  backgroundColor: "#333", // Tooltip background color
                  borderRadius: "5px", // Rounded corners
                  border: "none", // Remove border
                  color: "#fff", // Tooltip text color
                }}
                itemStyle={{
                  color: "#4CAF50", // Color for the tooltip item (line data point)
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="rect"
                iconSize={10}
              />
              <Line
                type="monotone"
                dataKey="thisMonth"
                stroke="#FC8A06"
                strokeWidth={2.5}
                name="This day"
                //activeDot={{ r: 8 }}
                dot={false}
              />
              <Line
                
                type="monotone"
                dataKey="lastMonth"
                strokeWidth={2.5}
                stroke="#03081F" 
                name="This day Last Month"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
}