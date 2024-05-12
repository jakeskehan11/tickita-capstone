import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import Homepage from "./pages/Homepage";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminDashboard from "./components/Dashboards/SuperAdminDashboard";
import UserRoutes from "./routes/UserRoutes";
import NotFound from "./pages/NotFound";

const App = () => {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/superadmin"
          element={user ? <SuperAdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/*"
          element={user ? <AdminRoutes /> : <Navigate to="/" />}
        />
        <Route
          path="/user/*"
          element={user ? <UserRoutes /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

// superadmin email: tickita@cvsu.edu.ph password: tickita123
