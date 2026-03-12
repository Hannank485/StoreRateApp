import adminApi from "@/api/adminApi";
import CreateUser from "@/components/CreateUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useEffect, useState } from "react";
import type { User } from "@/types";
import UserDetailCard from "@/components/UserDetailCard";
import { ArrowDownUp } from "lucide-react";
interface UserRated extends Omit<User, "stores"> {
  rating: number;
}
function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<UserRated>({});
  const [showUserData, setShowUserData] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortValue, setSortValue] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  const [roleSearch, setRoleSearch] = useState<string>("");
  async function getUser() {
    const data = await adminApi.getUsers();
    setUsers(data);
  }
  useEffect(() => {
    getUser();
  }, []);

  //   TO OPEN CREATE USER PANEL
  const handleOpen = () => {
    setOpenAddUser((prev) => !prev);
  };
  const handleShowUser = (
    name: string,
    id: number,
    email: string,
    role: string,
    rating: number,
    address: string,
  ) => {
    setUserData({
      name: name,
      id: id,
      email: email,
      role: role,
      rating: rating,
      address: address,
    });
    setShowUserData(true);
  };
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.address.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleSearch === "" || roleSearch === "all" ? true : u.role === roleSearch;

    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortValue] > b[sortValue] ? 1 : -1;
    }
    return a[sortValue] < b[sortValue] ? 1 : -1;
  });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="px-6 py-4">
      {openAddUser && (
        <CreateUser onSuccess={getUser} handleOpen={handleOpen} />
      )}
      {showUserData && (
        <UserDetailCard user={userData} handleOpen={setShowUserData} />
      )}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground">Add and view users.</p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            handleOpen();
          }}
        >
          Add User
        </Button>
      </div>
      <div className="bg-card rounded-sm p-4 mt-4">
        <div className="flex gap-3">
          <Input
            placeholder="Search"
            className="w-full md:w-1/2 basis-3/4"
            onChange={(e) => {
              handleSearchChange(e);
            }}
          />
          <Select onValueChange={(value) => setRoleSearch(value)}>
            <SelectTrigger className="w-full  ">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent className="mt-5">
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="OWNER">Owner</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table className="border-t mt-4 ">
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
                <TableHead
                  className="w-25 cursor-pointer text-center"
                  onClick={() => {
                    setSortValue("role");
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                  }}
                >
                  <p className="flex gap-1 items-center">
                    Role
                    <ArrowDownUp size={12} />
                  </p>
                </TableHead>
                <TableHead className=" w-25 text-center">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => {
                let average: number;
                if (user.role === "OWNER") {
                  const allRatings = user.stores.flatMap((store) =>
                    store.rating.map((r) => r.rating),
                  );
                  average = allRatings.length
                    ? allRatings.reduce((sum, r) => sum + r, 0) /
                      allRatings.length
                    : 0;
                }
                return (
                  <TableRow
                    key={user.id}
                    onClick={() => {
                      handleShowUser(
                        user.name,
                        user.id,
                        user.email,
                        user.role,
                        average,
                        user.address,
                      );
                    }}
                  >
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>
                      {user.name.slice(0, 15)}
                      {user.name.length > 15 && "..."}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.address.slice(0, 60)}
                      {user.address.length > 60 && "..."}
                    </TableCell>
                    <TableCell>
                      <p className="bg-muted  text-center px-1 rounded-xl text-xs ">
                        {user.role}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center">
                      {user.role === "OWNER" ? average?.toFixed(1) : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
