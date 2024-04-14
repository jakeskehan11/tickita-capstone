import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Dashboards/AdminDashboard";
import UserDashboard from "./Dashboards/UserDashboard";
import LoginPage from "./pages/LoginPage";
import {
  Dashboard,
  Tickets,
  Chat,
  Users,
  Teams,
  Feedbacks,
  Settings,
  NotFound,
} from "./pages/admin/index";

import { UserTickets, UserChat, UserSettings } from "./pages/user/index";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />

          <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="chat" element={<Chat />} />
            <Route path="users" element={<Users />} />
            <Route path="teams" element={<Teams />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/user-dashboard/*" element={<UserDashboard />}>
            <Route path="user-tickets" element={<UserTickets />} />
            <Route path="user-chat" element={<UserChat />} />
            <Route path="user-settings" element={<UserSettings />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
