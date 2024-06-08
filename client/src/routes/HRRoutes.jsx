import { Route, Routes } from "react-router-dom";
import HRDashboard from "@/components/Dashboards/HRDashboard";
import {
  TicketsPage,
  HRChat,
  HRSettings,
  HRFaq,
  HRUserFeedbacks,
} from "../pages/hr/index";
import NotFoundv2 from "@/pages/NotFoundv2";

const HRRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HRDashboard />}>
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="chat" element={<HRChat />} />
        <Route path="faq" element={<HRFaq />} />
        <Route path="feedbacks" element={<HRUserFeedbacks />} />
        <Route path="settings" element={<HRSettings />} />
        <Route path="*" element={<NotFoundv2 />} />
      </Route>
    </Routes>
  );
};
export default HRRoutes;
