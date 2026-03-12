import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import authApi from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getErrorMessage } from "@/api/client";

function Settings() {
  const [alert, setAlert] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      await authApi.updatePassword(password);
      setLoading(false);
      setAlert("Password Updated Successfully");
    } catch (err) {
      setLoading(false);

      setAlert(getErrorMessage(err));
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert("");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);
  return (
    <div className="px-6 py-4 flex flex-col items-center">
      {alert && (
        <Alert className=" absolute max-w-md right-20">
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1 text-center w-full">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your Settings</p>
      </div>
      <form
        className="mt-4 bg-white px-6 py-4 rounded-md w-full space-y-2 max-w-xl"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Label className="text-xl">Update Password</Label>
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Settings;
