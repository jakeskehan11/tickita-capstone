import { Route, Routes } from "react-router-dom";
import SuperAdminDashboard from "@/components/Dashboards/SuperAdminDashboard";
import {
   SignupPage,
   SuperAdminSettings
} from "../pages/superadmin/index";
import NotFoundv2 from "@/pages/NotFoundv2";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard />}>
        <Route path="create-account" element={<SignupPage />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="*" element={<NotFoundv2 />} />
      </Route>
    </Routes>
  );
};
export default SuperAdminRoutes;
