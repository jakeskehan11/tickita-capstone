import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import "../App.css";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="w-72 fixed z-50 bg-green-950">
          <AdminSidebar />
        </div>

        <div className="fixed w-full bg-green-950 h-20">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;
