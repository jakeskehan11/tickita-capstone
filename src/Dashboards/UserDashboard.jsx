import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import Navbar from "../components/Navbar";
import "../App.css";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="fixed w-full bg-green-950 h-12">
          <Navbar />
        </div>

        <div className="w-60 fixed bg-green-950 mt-12">
          <UserSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default UserDashboard;
