import { Route, Routes } from "react-router-dom";
import UserDashboard from "@/components/Dashboards/UserDashboard";
import {
  TicketsPage,
  UserChat,
  UserSettings,
  UserFaq,
} from "../pages/user/index";
import NotFoundv2 from "@/pages/NotFoundv2";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />}>
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="chat" element={<UserChat />} />
        <Route path="faq" element={<UserFaq />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="*" element={<NotFoundv2 />} />
      </Route>
    </Routes>
  );
};
export default UserRoutes;
