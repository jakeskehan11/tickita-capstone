import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login validation and authentication
    if (username === "admin" && password === "password") {
      setUserType("admin");
      navigate("/admin-dashboard/dashboard");
    } else if (username === "user" && password === "password") {
      setUserType("user");
      navigate("/user-dashboard/user-tickets");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">TICKITA Login</CardTitle>
          <CardDescription>
            Enter your CVSU Email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@cvsu.edu.ph"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-900 hover:bg-green-800"
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
