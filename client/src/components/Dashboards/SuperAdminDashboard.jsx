import { Outlet } from "react-router-dom";
import SuperAdminNavbar from "../Navbar/SuperAdminNavbar";
import SuperAdminSidebar from "../Sidebar/SuperAdminSidebar";

const SuperAdminDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="fixed w-full h-14 bg-white">
          <SuperAdminNavbar />
        </div>
        <div className="w-60 fixed bg-green-950">
          <SuperAdminSidebar />
        </div>
        <main className="bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default SuperAdminDashboard;
