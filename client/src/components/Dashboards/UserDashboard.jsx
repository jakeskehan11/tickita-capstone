import { Outlet } from "react-router-dom";
import UserSidebar from "../Sidebar/UserSidebar";
import UserNavbar from "../Navbar/UserNavbar";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="fixed w-full h-14 bg-white">
          <UserNavbar />
        </div>
        <div className="w-60 fixed bg-green-950">
          <UserSidebar />
        </div>
        <main className="bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default UserDashboard;
