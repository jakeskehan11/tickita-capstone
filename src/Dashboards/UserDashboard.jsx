import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import Navbar from "../components/Navbar";
import "../App.css";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="w-64 fixed z-10 bg-green-950">
          <UserSidebar />
        </div>

        <div className="fixed w-full bg-green-950 h-20">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default UserDashboard;
