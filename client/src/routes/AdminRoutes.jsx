import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/components/Dashboards/AdminDashboard";
import {
  Dashboard,
  JobTickets,
  TechnicalJobTickets,
  Chat,
  Feedbacks,
  Settings,
} from "../pages/admin/index";
import NotFound from "@/pages/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* PPSS Admin can only access */}
        <Route path="job-tickets" element={<JobTickets />} />
        {/* Computer Technician Admin can only access */}
        <Route path="technical-job-tickets" element={<TechnicalJobTickets />} />
        <Route path="chat" element={<Chat />} />
        <Route path="feedbacks" element={<Feedbacks />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
