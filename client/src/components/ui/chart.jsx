import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  return (
    <div className="flex justify-evenly items-center mt-10">
      <Card className="w-5/12">
        <CardHeader>
          <CardTitle>Ticket Resolution Time</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Average time to resolve tickets over the last 6 months
          </p>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[16/9]" />
        </CardContent>
      </Card>
      <Card className="w-5/12">
        <CardHeader>
          <CardTitle>Ticket Trends</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ticket volume over the last 6 months
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer className="aspect-[16/9]">
            <AreaChart
              width={500}
              height={400}
              data={LineChartdata}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="tickets"
                stroke="#003300"
                fill="rgb(234 179 8)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;

function BarChart({ className }) {
  return (
    <div className={className}>
      <ResponsiveBar
        data={[
          { name: "Jan", hours: 111 },
          { name: "Feb", hours: 157 },
          { name: "Mar", hours: 129 },
          { name: "Apr", hours: 150 },
          { name: "May", hours: 119 },
          { name: "Jun", hours: 72 },
        ]}
        keys={["hours"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        borderRadius={5}
        padding={0.5}
        colors={["#003300"]}
        axisBottom={{ tickSize: 0, tickPadding: 16 }}
        axisLeft={{ tickSize: 0, tickValues: 4, tickPadding: 16 }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: { borderRadius: "9999px" },
            container: { fontSize: "12px", textTransform: "capitalize" },
          },
          grid: { line: { stroke: "#f3f4f6" } },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="ticket"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

const LineChartdata = [
  {
    name: "Jan",
    tickets: 1500,
  },
  {
    name: "Feb",
    tickets: 800,
  },
  {
    name: "March",
    tickets: 2000,
  },
  {
    name: "Apr",
    tickets: 2500,
  },
  {
    name: "May",
    tickets: 3100,
  },
  {
    name: "Jun",
    tickets: 2600,
  },
];

export { Chart, BarChart };