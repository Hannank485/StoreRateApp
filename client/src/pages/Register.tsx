import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import authApi from "@/api/authApi";
import { getErrorMessage } from "@/api/client";
import { useNavigate } from "react-router";
function Register({
  setAuth,
  setRole,
}: {
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authApi.register(name, email, password, address);
      await authApi.login(email, password);
      setAuth(true);
      setRole("USER");
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  return (
    <div className="w-full ">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-xs md:w-md">
        <Card className="w-full ">
          <CardHeader className="flex flex-col gap-2 items-center">
            <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
            <CardDescription>Create an Account!</CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  minLength={20}
                  maxLength={60}
                  type="text"
                  placeholder="Name   (20-60 CHARS)"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
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
                <Label>Address</Label>
                <Input
                  maxLength={400}
                  type="text"
                  placeholder="Please enter your address"
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  minLength={8}
                  maxLength={16}
                  type="password"
                  placeholder="8-16 Chars, 1 Uppercase Char, 1 Special Char"
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
              <Button type="submit" className="w-full cursor-pointer ">
                Register
              </Button>

              <p
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already a User? Sign in
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Register;
