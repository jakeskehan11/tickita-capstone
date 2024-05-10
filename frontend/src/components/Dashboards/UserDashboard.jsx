import { Outlet } from "react-router-dom";
import UserSidebar from "../Sidebar/UserSidebar";
import UserNavbar from "../Navbar/UserNavbar";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="fixed w-full bg-green-950 h-14 z-50">
          <UserNavbar />
        </div>
        <div className="w-60 fixed bg-green-950 mt-14 z-50">
          <UserSidebar />
        </div>
        <main className="bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default UserDashboard;
