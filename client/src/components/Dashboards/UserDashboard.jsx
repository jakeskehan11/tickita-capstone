import { Outlet } from "react-router-dom";
import UserSidebar from "../Sidebar/UserSidebar";
import Navbar from "../Navbar";

const UserDashboard = () => {
  return (
    <div className="flex overflow-y-auto scrollbar-custom">
      <div className="w-full">
        <div className="fixed w-full bg-slate-50 z-10">
          <Navbar />
        </div>
        <div className="w-60 fixed bg-green-950 z-20">
          <UserSidebar />
        </div>
        <main className="bg-slate-100 h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default UserDashboard;
