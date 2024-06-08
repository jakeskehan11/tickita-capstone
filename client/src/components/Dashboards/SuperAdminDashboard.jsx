import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import SuperAdminSidebar from "../Sidebar/SuperAdminSidebar";

const SuperAdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="fixed w-full bg-slate-50 z-10">
          <Navbar />
        </div>
        <div className="w-60 fixed bg-green-950 z-20">
          <SuperAdminSidebar />
        </div>
        <main className="bg-slate-100 h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default SuperAdminDashboard;
