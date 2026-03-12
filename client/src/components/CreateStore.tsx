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

import adminApi from "@/api/adminApi";
function CreateStore({
  onSuccess,
  handleOpen,
}: {
  onSuccess: () => Promise<void>;
  handleOpen: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!userId) {
        setError("No User ID defined");
        return;
      }
      await adminApi.createStore(name, email, address, userId);
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
                placeholder="Please enter store name (20-60 CHARS)"
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
                placeholder="Please enter store email"
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
                placeholder="Please enter store address"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>User ID</Label>
              <Input
                type="number"
                placeholder="Please enter the User ID"
                required
                onChange={(e) => {
                  setUserId(Number(e.target.value));
                }}
              />
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

export default CreateStore;
