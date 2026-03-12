import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import authApi from "@/api/authApi";
import { useNavigate } from "react-router";
import { getErrorMessage } from "@/api/client";
function Login({
  setAuth,
  setRole,
  setId,
}: {
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authApi.login(email, password);
      const role = await authApi.checkAuth();
      setRole(role.role);
      setId(role.id);
      setAuth(true);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  return (
    <div className="w-full ">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-xs     md:w-md">
        <Card className="w-full ">
          <CardHeader className="flex flex-col gap-2 items-center">
            <CardTitle className="text-xl font-bold">Login</CardTitle>
            <CardDescription>Login to your Account</CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="Please enter your email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Please Enter your password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-4">
              {error && (
                <p className="text-destructive font-semibold">{error}</p>
              )}
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>

              <p
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Do not have an account? Sign Up
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
