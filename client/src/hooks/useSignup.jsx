import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password, role) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://tickita-api.vercel.app/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        return false; // Return false if signup fails
      }

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      // dispatch({ type: "LOGIN", payload: json });

      return true; // Return true if signup is successful
    } catch (error) {
      setError(error.message);
      return false; // Return false if an error occurs
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
