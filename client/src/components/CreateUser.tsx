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
import { getErrorMessage } from "@/api/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import adminApi from "@/api/adminApi";
function CreateUser({
  onSuccess,
  handleOpen,
}: {
  onSuccess: () => Promise<void>;
  handleOpen: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await adminApi.createUser(name, email, password, address, role);
      onSuccess();
      handleOpen();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  return (
    <div className="fixed inset-0  z-10 backdrop-blur-2xl flex justify-center items-center">
      <Card className="w-full max-w-xl  ">
        <CardHeader className="flex flex-col gap-2 items-center">
          <CardTitle className="text-xl font-bold">Create User</CardTitle>
          <CardDescription>Create a new User</CardDescription>
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
                placeholder="Please enter the name (20-60 CHARS)"
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
                placeholder="Please enter the email"
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
                placeholder="Please enter the address"
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
              <Label>Role</Label>
              <Select onValueChange={(value) => setRole(value)}>
                <SelectTrigger className="w-full  ">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent className="mt-5">
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="OWNER">Owner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-4">
            {error && <p className="text-destructive font-semibold">{error}</p>}
            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                className="w-full bg-destructive cursor-pointer hover:bg-destructive/90 "
                onClick={handleOpen}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full cursor-pointer ">
                Create
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CreateUser;
