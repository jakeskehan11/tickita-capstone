import { Outlet } from "react-router-dom";
import SuperAdminNavbar from "../Navbar/SuperAdminNavbar";
import SuperAdminSidebar from "../Sidebar/SuperAdminSidebar";

const SuperAdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="fixed w-full bg-slate-50 z-10">
          <SuperAdminNavbar />
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
