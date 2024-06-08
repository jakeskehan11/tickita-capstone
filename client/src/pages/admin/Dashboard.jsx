import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { LuTicket } from "react-icons/lu";
import { Chart } from "../../components/ui/chart";

const Dashboard = () => {
  return (
    <div className="ml-60 pt-20 bg-slate-100">
      <h1 className="font-bold text-3xl ml-12">Dashboard</h1>
      <div className="flex justify-center items-start gap-6 flex-wrap mt-10">
        <Card className="w-64 2xl:w-[22rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-bold">
              Open Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-3xl font-bold text-green-900">2,600</div>
            <p className="text-xs text-gray-500 ">+12.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="w-64 2xl:w-[22rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-bold">
              Pending Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-3xl font-bold text-yellow-500">1,234</div>
            <p className="text-xs text-gray-500 ">+8.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="w-64 2xl:w-[22rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-bold">
              Resolved Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-3xl font-bold text-blue-600">250</div>
            <p className="text-xs text-gray-500">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="w-64 2xl:w-[22rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-base font-bold">
              Closed Tickets
            </CardTitle>
            <LuTicket className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent className="mt-8">
            <div className="text-3xl font-bold text-red-600">1,116</div>
            <p className="text-xs text-gray-500 ">+15% from last month</p>
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
