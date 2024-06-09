import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "@/components/Dashboards/AdminDashboard";
import {
  Dashboard,
  JobTickets,
  JobTicketFeedbacks,
  TechnicalJobTickets,
  TechnicalJobTicketFeedbacks,
  Chat,
  Feedbacks,
  Settings,
} from "../pages/admin/index";
import NotFoundv2 from "@/pages/NotFoundv2";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminRoutes = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/* PPSS Admin can only access */}
        <Route
          path="tickets"
          element={
            user.role === "PPSS" ? (
              <JobTickets />
            ) : user.role === "Computer Technician" ? (
              <TechnicalJobTickets />
            ) : (
              <Navigate to="*" replace />
            )
          }
        />
        {/* Computer Technician Admin can only access */}
        <Route
          path="feedbacks"
          element={
            user.role === "PPSS" ? (
              <JobTicketFeedbacks />
            ) : user.role === "Computer Technician" ? (
              <TechnicalJobTicketFeedbacks />
            ) : (
              <Navigate to="*" replace />
            )
          }
        />
        <Route path="chat" element={<Chat />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFoundv2 />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
