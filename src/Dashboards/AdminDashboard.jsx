import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import AdminNavbar from "../components/Navbar/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full ">
        <div className="fixed w-full bg-green-950 h-14 border-b z-50 border-black">
          <AdminNavbar />
        </div>
        <div className="w-60 fixed bg-green-950 mt-14 z-50">
          <AdminSidebar />
        </div>
        <main className="bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
