import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { LuTicket } from "react-icons/lu";
import { Chart } from "../../components/ui/chart";

const Dashboard = () => {
  return (
    <div className="ml-60 h-screen pt-20">
      <h1 className="font-bold text-3xl ml-12">Dashboard</h1>
      <div className="flex justify-center items-start gap-5 flex-wrap mt-10">
        <Card className="w-[22.5rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 lg">
            <CardTitle className="text-sm font-semibold">
              Total Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-2xl font-bold">2,600</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +12.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="w-[22.5rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold">
              Open Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +8.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="w-[22.5rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold">
              Pending Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="w-[22.5rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold">
              Closed Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-2xl font-bold">1,116</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};
export default Dashboard;
