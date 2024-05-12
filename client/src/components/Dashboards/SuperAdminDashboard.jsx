import { Outlet } from "react-router-dom";
import SuperAdminNavbar from "../Navbar/SuperAdminNavbar";
import SignupPage from "../../pages/superadmin/SignupPage";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="h-screen w-full ">
        <div className="fixed w-full bg-green-950 h-14 border-b z-50 border-black">
          <SuperAdminNavbar />
        </div>
        <main className="bg-slate-50">
          <SignupPage />
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
