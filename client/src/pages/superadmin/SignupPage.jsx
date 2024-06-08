import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  CardContent,
  CardFooter,
  Card,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const { signup, error, isLoading } = useSignup();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const signupSuccess = await signup(
        firstName,
        lastName,
        email,
        password,
        role
      );

      if (signupSuccess) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("user");
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="ml-60 pt-20 bg-slate-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[32rem] mt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              TICKITA Create Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                placeholder="First Name"
                required
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                placeholder="Last Name"
                required
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@cvsu.edu.ph"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select
                defaultValue="user"
                id="role"
                onValueChange={setRole}
                value={role}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="Computer Technician">
                    Computer Technician Admin
                  </SelectItem>
                  <SelectItem value="PPSS">PPSS Admin</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-green-950 hover:bg-green-900"
              type="submit"
              disabled={isLoading}
            >
              Create Account
            </Button>
          </CardFooter>
        </Card>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold mb-4">
                Account has been created successfully!
              </AlertDialogTitle>
              <AlertDialogDescription>
                {new Date().toLocaleString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setIsAlertOpen(false);
                }}
                className="bg-green-950 hover:bg-green-900 w-full"
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
};
export default SignupPage;
