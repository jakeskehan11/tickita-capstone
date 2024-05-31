import { Outlet } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="fixed w-full bg-slate-50 z-10">
          <AdminNavbar />
        </div>
        <div className="w-60 fixed bg-green-950 z-20">
          <AdminSidebar />
        </div>
        <main className="bg-slate-100 h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
