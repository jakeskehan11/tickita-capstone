import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://tickita-api.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);

      if (json && json.role) {
        if (json.role === "PPSS" || json.role === "Computer Technician") {
          navigate("admin/dashboard");
        } else if (json.role === "user") {
          navigate("user/tickets");
        } else if (json.role === "superadmin") {
          navigate("superadmin/create-account");
        } else if (json.role === "HR") {
          navigate("hr/tickets");
        }
      }
    }
  };

  return { login, isLoading, error };
};
