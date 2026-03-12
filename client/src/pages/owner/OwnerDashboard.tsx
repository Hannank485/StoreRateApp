import ownerApi from "@/api/ownerApi";
import { Card } from "@/components/ui/card";
import { Star, Store } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Stores, Rating } from "@/types";

function OwnerDashboard() {
  const [stores, setStores] = useState<Stores[]>([]);
  const [Ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const fetchStore = async () => {
    const store = await ownerApi.getUserStores();
    setStores(store.stores);
  };
  useEffect(() => {
    fetchStore();
  }, []);
  useEffect(() => {
    const allRatings = stores.flatMap((store) => {
      setRatings(store.rating);
      return store.rating.map((r) => r.rating);
    });

    const average =
      allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
        : 0;
    setAverageRating(average);
  }, [stores]);
  return (
    <div className=" px-6 py-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <p className="text-muted-foreground">Overview of your stores.</p>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Card className="w-full flex justify-center px-8 ">
          <div className="flex items-center gap-8">
            <p className="bg-green-300/30 p-3 rounded-md">
              <Store className="text-green-600" />
            </p>
            <div className="flex flex-col gap-px">
              <p>Stores</p>
              <p className="text-muted-foreground">{stores.length}</p>
            </div>
          </div>
        </Card>
        <Card className="w-full flex justify-center px-8 ">
          <div className="flex items-center gap-8">
            <p className="bg-yellow-300/30 p-3 rounded-md">
              <Star className="text-yellow-600" />
            </p>
            <div className="flex flex-col gap-px">
              <p>Avg. Rating</p>
              <p className="text-muted-foreground">
                {averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <Card className=" px-4  mt-4 overflow-x-auto">
        <h1 className="font-bold text-lg">Stores:</h1>
        <Table className="border-t">
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => {
              const allRating = store.rating.map((r) => r.rating);
              const average = allRating.reduce((sum, r) => sum + r, 0);
              return (
                <TableRow key={store.id}>
                  <TableCell>{store.name} </TableCell>
                  <TableCell>
                    {store.address.slice(0, 60)}
                    {store.address.length > 60 && "..."}
                  </TableCell>
                  <TableCell className="text-right">
                    {average.toFixed(1)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
      <Card className=" px-4  mt-4 overflow-x-auto">
        <h1 className="font-bold text-lg">Reviews:</h1>

        <Table className="border-t">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Ratings.map((rating) => {
              return (
                <TableRow key={rating.id}>
                  <TableCell>{rating.users.name} </TableCell>
                  <TableCell>
                    {stores.find((s) => s.id == rating.storeId)?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {rating.rating.toFixed(1)}
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

export default OwnerDashboard;
