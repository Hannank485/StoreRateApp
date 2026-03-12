import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/types";
import { Button } from "./ui/button";

interface UserRated extends Omit<User, "stores"> {
  rating: number;
}

function UserDetailCard({
  user,
  handleOpen,
}: {
  user: UserRated;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0  z-10 backdrop-blur-2xl flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription className="whitespace-normal">
            {user.email}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p>Address: {user.address}</p>
          <p>Role: {user.role}</p>
          <p>Rating: {user.rating ? user.rating : "-"}</p>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="bg-destructive w-full"
            onClick={() => handleOpen(false)}
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserDetailCard;
