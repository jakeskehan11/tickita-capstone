import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

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
          <LineChart className="aspect-[16/9]" />
        </CardContent>
      </Card>
    </div>
  );
};
export default Chart;

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        borderRadius={5}
        padding={0.5}
        colors={["#003300"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Ticket",
            data: [
              { x: "Jan", y: 500 },
              { x: "Feb", y: 900 },
              { x: "Mar", y: 2000 },
              { x: "Apr", y: 400 },
              { x: "May", y: 1500 },
              { x: "Jun", y: 2600 },
            ],
          },
          
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#eab308"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="ticket"
      />
    </div>
  );
}

export { Chart, BarChart, LineChart };
