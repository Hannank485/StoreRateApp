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
import { Button } from "./ui/button";
function AuthCard() {
  return (
    <div>
      <Card className="w-full ">
        <CardHeader className="flex flex-col gap-2 items-center">
          <CardTitle className="text-xl font-bold">Login</CardTitle>
          <CardDescription>Login to your Account</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="Please enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Please Enter your password"
                required
              />
            </div>
          </CardContent>
        </form>
        <CardFooter>
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthCard;
