import adminApi from "@/api/adminApi";
import { Card } from "@/components/ui/card";
import { Star, Store, Users } from "lucide-react";
import { useEffect, useState } from "react";

function Dashboard() {
  const [users, setUsers] = useState<number>(0);
  const [stores, setStores] = useState<number>(0);
  const [ratings, setRatings] = useState<number>(0);
  const getData = async () => {
    const data = await adminApi.dashboard();
    setUsers(data.users);
    setStores(data.stores);
    setRatings(data.ratings);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" px-6 py-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of system statistics.</p>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card className="w-full flex justify-center px-8 ">
          <div className="flex items-center gap-8">
            <p className="bg-blue-300/30 p-3 rounded-md">
              <Users className="text-blue-600" />
            </p>
            <div className="flex flex-col gap-px">
              <p>Users</p>
              <p className="text-sm text-muted-foreground">{users}</p>
            </div>
          </div>
        </Card>
        <Card className="w-full flex justify-center px-8 ">
          <div className="flex items-center gap-8">
            <p className="bg-green-300/30 p-3 rounded-md">
              <Store className="text-green-600" />
            </p>
            <div className="flex flex-col gap-px">
              <p>Stores</p>
              <p className="text-sm text-muted-foreground">{stores}</p>
            </div>
          </div>
        </Card>
        <Card className="w-full flex justify-center px-8 ">
          <div className="flex items-center gap-8">
            <p className="bg-yellow-300/30 p-3 rounded-md">
              <Star className="text-yellow-600" />
            </p>
            <div className="flex flex-col gap-px">
              <p>Ratings</p>
              <p className="text-sm text-muted-foreground">{ratings}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
