import type { Request, Response } from "express";
import storeServices from "../services/storeServices";
import { appError, Store, UserRequest } from "../type";

const storeController = {
  async getStore(req: Request, res: Response) {
    const stores = await storeServices.getAllStores();
    return res.status(200).json({ stores });
  },
  async getStoreById(req: UserRequest, res: Response) {
    const storeId = Number(req.params.id);
    const userId = req.userId;
    if (!storeId) {
      throw new appError("No ID found", 400);
    }
    if (!userId) {
      throw new appError("unauthorized", 403);
    }
    const store = await storeServices.getStoreById(storeId, userId);
    return res.status(200).json({ store });
  },

  async getStoreByUser(req: UserRequest, res: Response) {
    const userId = req.userId;
    if (!userId) {
      throw new appError("unauthorized", 403);
    }
    const stores = await storeServices.getStoreByUser(userId);
    return res.status(200).json({ stores });
  },
};

export default storeController;
