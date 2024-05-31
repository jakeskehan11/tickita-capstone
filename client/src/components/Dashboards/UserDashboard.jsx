import { Outlet } from "react-router-dom";
import UserSidebar from "../Sidebar/UserSidebar";
import UserNavbar from "../Navbar/UserNavbar";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="fixed w-full bg-slate-50 z-10">
          <UserNavbar />
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
