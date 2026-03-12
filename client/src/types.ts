export type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  stores: Stores[];
};

export type Stores = {
  id: number;
  name: string;
  email: string;
  userId: number;
  address: string;
  rating: Rating[];
};

export type Rating = {
  id: number;
  rating: number;
  storeId: number;
  userId: number;
  users: {
    name: string;
  };
};
