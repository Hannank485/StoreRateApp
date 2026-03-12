import adminApi from "@/api/adminApi";
import CreateStore from "@/components/CreateStore";
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
import { useEffect, useState } from "react";
import type { Stores } from "@/types";
import { ArrowDownUp } from "lucide-react";

function AdminStores() {
  const [stores, setStores] = useState<Stores[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortValue, setSortValue] = useState<keyof Stores>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [openAddStore, setOpenAddStore] = useState<boolean>(false);
  async function getStore() {
    const data = await adminApi.getStore();
    setStores(data.stores);
  }
  useEffect(() => {
    getStore();
  }, []);

  //   TO OPEN CREATE USER PANEL
  const handleOpen = () => {
    setOpenAddStore((prev) => !prev);
  };

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
  return (
    <div className="px-6 py-4">
      {openAddStore && (
        <CreateStore onSuccess={getStore} handleOpen={handleOpen} />
      )}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Manage Store</h1>
          <p className="text-muted-foreground">Add and view stores.</p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => {
            handleOpen();
          }}
        >
          Add Store
        </Button>
      </div>
      <div className="bg-card rounded-sm p-4 mt-4">
        <Input
          placeholder="Search"
          className="w-full md:w-1/2"
          onChange={(e) => {
            handleSearchChange(e);
          }}
        />
        <div className="overflow-x-auto">
          <Table className="border-t mt-4  min-w-[700px]">
            <TableHeader>
              <TableRow className="select-none">
                <TableHead
                  className="w-10 cursor-pointer "
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
                  className="cursor-pointer "
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

                <TableHead className=" w-25 text-center">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStores.map((store) => {
                const allRatings = store.rating.map((r) => r.rating);

                const average = allRatings.length
                  ? allRatings.reduce((sum, r) => sum + r, 0) /
                    allRatings.length
                  : 0;
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

export default AdminStores;
