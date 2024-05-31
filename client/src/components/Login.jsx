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
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e?.preventDefault();

    await login(email, password);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-none shadow-none border-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">TICKITA Login</CardTitle>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-green-950 hover:bg-green-900"
            disabled={isLoading}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginPage;
