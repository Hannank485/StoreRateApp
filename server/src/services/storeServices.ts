import authModels from "../models/authModels";
import storeModels from "../models/storeModels";
import { appError, Store } from "../type";

const storeServices = {
  async createStore(storeData: Store) {
    const user = await authModels.findUserById(storeData.userId);
    if (!user) {
      throw new appError("Invalid UserID", 400);
    }
    if (user.role !== "OWNER") {
      throw new appError("User is not Owner", 400);
    }
    if (storeData.name.length > 60 || storeData.name.length < 20) {
      throw new appError("Ensure username length is between 20-60 chars", 400);
    }
    if (storeData.address.length > 400) {
      throw new appError("Please keep address to below 400 chars", 400);
    }
    const emailRegex = /^[^\s@]+@+[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(storeData.email)) {
      throw new appError("Please ensure email is valid", 400);
    }
    const storeExist = await storeModels.fetchSingleStore(storeData.email);
    if (storeExist) {
      throw new appError("Email Already Exists", 400);
    }
    await storeModels.createStore(storeData);
  },
  async getAllStores() {
    const stores = await storeModels.getAllStores();
    return stores;
  },
  async getStoreById(id: number, userId: number) {
    const store = await storeModels.getStoreById(id);
    if (!store) {
      throw new appError("Invalid ID", 400);
    }
    if (store.userId !== userId) {
      throw new appError("Forbidden Access", 403);
    }
    return store;
  },
  async getStoreByUser(userId: number) {
    const stores = await storeModels.getStoreByUser(userId);
    return stores;
  },
};

export default storeServices;
