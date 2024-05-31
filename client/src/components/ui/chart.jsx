import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

const Chart = () => {
  return (
    <div className="flex justify-evenly items-center mt-10">
      <Card className="w-5/12">
        <CardHeader>
          <CardTitle>Ticket Trends</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ticket volume over the last 6 months
          </p>
        </CardHeader>
        <CardContent>
          <BarChart className="aspect-[16/9]" />
        </CardContent>
      </Card>
      <Card className="w-5/12">
        <CardHeader>
          <CardTitle>Overall Tickets</CardTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Ticket volume of the current month
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer className="aspect-[16/9]">
            <PieChart>
              <Pie
                data={ticketsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="65%"
                fill="#fff"
                dataKey="tickets"
              >
                {ticketsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Pie
                dataKey="tickets"
                data={totalTickets}
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="95%"
                fill="#000"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;

const ticketsData = [
  { name: "Open", tickets: 500 },
  { name: "Pending", tickets: 300 },
  { name: "Resolved", tickets: 150 },
  { name: "Closed", tickets: 150 },
];
const COLORS = [
  "rgb(5 46 22)",
  "rgb(234 179 8)",
  " rgb(37 99 235)",
  "rgb(220 38 38)",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const totalTickets = [{ name: "Total Tickets", tickets: 1000 }];

function BarChart({ className }) {
  return (
    <div className={className}>
      <ResponsiveBar
        data={[
          { name: "JAN", tickets: 111 },
          { name: "FEB", tickets: 157 },
          { name: "MAR", tickets: 129 },
          { name: "APR", tickets: 140 },
          { name: "MAY", tickets: 250 },
          { name: "JUN", tickets: 150 },
        ]}
        keys={["tickets"]}
        indexBy="name"
        margin={{ top: 10, right: 0, bottom: 40, left: 40 }}
        borderRadius={5}
        padding={0.5}
        colors={["#003300"]}
        axisBottom={{ tickSize: 0, tickPadding: 16 }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: { borderRadius: "9999px" },
            container: { fontSize: "12px", textTransform: "capitalize" },
          },
          grid: { line: { stroke: "#f3f4f6" } },
          axis: {
            ticks: {
              text: { fontSize: "14px", fontWeight: "bold" },
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="ticket"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

export { Chart, BarChart };
