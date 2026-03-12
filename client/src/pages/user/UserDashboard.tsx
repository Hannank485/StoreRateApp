import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import userApi from "@/api/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/api/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { Stores } from "@/types";
import { ArrowDownUp } from "lucide-react";
function UserDashboard({ currentId }: { currentId: number }) {
  const [search, setSearch] = useState<string>("");
  const [stores, setStores] = useState<Stores[]>([]);
  const [sortValue, setSortValue] = useState<keyof Stores>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [rating, setRating] = useState<Record<number, string>>({});
  const [alert, setAlert] = useState<string>("");
  const getData = async () => {
    const data = await userApi.getStores();
    setStores(data.stores);
    console.log(data.stores);
  };
  useEffect(() => {
    getData();
  }, []);
  const filteredStores = stores.filter(
    (u) =>
      u.address.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortValue] > b[sortValue] ? 1 : -1;
    }
    return a[sortValue] < b[sortValue] ? 1 : -1;
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleRating = async (id: number, rating: number) => {
    try {
      await userApi.rateStores(id, rating);
      getData();
    } catch (err) {
      setRating("0");
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
    <div className=" px-6 py-4">
      {alert && (
        <Alert className=" absolute max-w-md right-20">
          <AlertTitle>Alert</AlertTitle>
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1 w-full text-center">
        <h1 className="text-3xl font-bold">Store Dashboard</h1>
        <p className="text-muted-foreground">View and Rate all Stores</p>
      </div>
      <div className="bg-card p-4 mt-4 rounded-sm flex justify-center">
        <Input
          className="max-w-2xl"
          placeholder="Search..."
          onChange={(e) => {
            handleSearchChange(e);
          }}
        />
      </div>
      <Card className=" px-4  mt-4 overflow-x-auto">
        <Table className="border-t mt-4  min-w-[700px]">
          <TableHeader>
            <TableRow className="select-none">
              <TableHead
                className="w-10 cursor-pointer"
                onClick={() => {
                  setSortValue("id");
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
              >
                <p className="flex gap-1 items-center">
                  id
                  <ArrowDownUp size={12} />
                </p>
              </TableHead>
              <TableHead
                className="w-50 cursor-pointer"
                onClick={() => {
                  setSortValue("name");
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
              >
                <p className="flex gap-1 items-center">
                  Name
                  <ArrowDownUp size={12} />
                </p>
              </TableHead>
              <TableHead
                className="w-50 cursor-pointer"
                onClick={() => {
                  setSortValue("email");
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
              >
                <p className="flex gap-1 items-center">
                  Email
                  <ArrowDownUp size={12} />
                </p>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortValue("address");
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
              >
                <p className="flex gap-1 items-center">
                  Address
                  <ArrowDownUp size={12} />
                </p>
              </TableHead>
              <TableHead className=" w-25 text-center">
                Overall Rating
              </TableHead>
              <TableHead className=" w-25 text-center">Your Rating</TableHead>
              <TableHead className=" w-25 text-center">Modify Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStores.map((store) => {
              const allRatings = store.rating.map((r) => r.rating);

              const average = allRatings.length
                ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
                : 0;
              const userRating = store.rating.find((r) => {
                return r.userId === currentId;
              });
              return (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.id}</TableCell>
                  <TableCell>
                    {store.name.slice(0, 15)}
                    {store.name.length > 15 && "..."}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {store.email}
                  </TableCell>
                  <TableCell>
                    {store.address.slice(0, 60)}
                    {store.address.length > 60 && "..."}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    {average.toFixed(1)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    {userRating ? userRating.rating : "-"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-center">
                    <Select
                      value={rating[store.id] ?? ""}
                      onValueChange={(value) => {
                        setRating((prev) => ({
                          ...prev,
                          [store.id]: value,
                        }));

                        handleRating(store.id, Number(value));
                      }}
                    >
                      <SelectTrigger className="w-full  ">
                        <SelectValue
                          placeholder={userRating?.rating ? "Modify" : "Rate"}
                        />
                      </SelectTrigger>
                      <SelectContent className="mt-5">
                        <SelectGroup>
                          <SelectLabel>
                            {userRating?.rating ? "Modify" : "Rate"}
                          </SelectLabel>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default UserDashboard;
