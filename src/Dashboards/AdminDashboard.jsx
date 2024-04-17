import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full ">
        <div className="fixed w-full bg-green-950 h-12 border-b border-black">
          <AdminNavbar />
        </div>
        <div className="w-60 fixed  bg-green-950 mt-12">
          <AdminSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;
