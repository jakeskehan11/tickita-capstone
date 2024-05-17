import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { TicketsContextProvider } from "./context/TicketsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TicketsContextProvider>
        <App />
      </TicketsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
