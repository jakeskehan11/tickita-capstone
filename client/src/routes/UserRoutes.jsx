import { Route, Routes } from "react-router-dom";
import UserDashboard from "@/components/Dashboards/UserDashboard";
import {
  UserTickets,
  UserChat,
  UserSettings,
  UserFaq,
} from "../pages/user/index";
import NotFound from "@/pages/NotFoundv2";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />}>
        <Route path="tickets" element={<UserTickets />} />
        <Route path="chat" element={<UserChat />} />
        <Route path="faq" element={<UserFaq />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default UserRoutes;
