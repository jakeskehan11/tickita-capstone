import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import HRRoutes from "./routes/HRRoutes";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";


const App = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }

    setIsAuthReady(true);
  }, [dispatch]);

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/superadmin/*"
          element={
            user !== null &&
            user !== undefined &&
            user.role === "superadmin" ? (
              <SuperAdminRoutes />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/*"
          element={
            user !== null &&
            user !== undefined &&
            (user.role === "PPSS" || user.role === "Computer Technician") ? (
              <AdminRoutes />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/user/*"
          element={
            user !== null && user !== undefined && user.role === "user" ? (
              <UserRoutes />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/hr/*"
          element={
            user !== null && user !== undefined && user.role === "HR" ? (
              <HRRoutes />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

// superadmin email: tickita@cvsu.edu.ph password: tickita123
