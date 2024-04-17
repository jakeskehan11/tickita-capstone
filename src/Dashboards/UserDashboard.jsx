import { Outlet } from "react-router-dom";
import UserSidebar from "../components/Sidebar/UserSidebar";
import UserNavbar from "../components/Navbar/UserNavbar";

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div className="fixed w-full bg-green-950 h-14">
          <UserNavbar />
        </div>

        <div className="w-60 fixed bg-green-950 mt-14">
          <UserSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default UserDashboard;
