import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="user/*" element={<UserRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
