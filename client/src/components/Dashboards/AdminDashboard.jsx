import { Outlet } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminNavbar from "../Navbar/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="fixed w-full h-14 bg-white">
          <AdminNavbar />
        </div>
        <div className="w-60 fixed bg-green-950">
          <AdminSidebar />
        </div>
        <main className="bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
