import type { Request, Response } from "express";
import adminServices from "../services/adminServices";
import { type User, type Store, appError } from "../type";
import type { UserRequest } from "../type";
import storeServices from "../services/storeServices";
const adminController = {
  async createStore(req: UserRequest, res: Response) {
    const { name, email, address, userId } = req.body;

    const storeData: Store = { name, email, address, userId };
    await storeServices.createStore(storeData);
    return res.status(201).json({ message: "Created" });
  },

  async dashboard(req: Request, res: Response) {
    const { userCount, storeCount, ratingCount } =
      await adminServices.dashboard();
    return res
      .status(200)
      .json({ stores: storeCount, users: userCount, ratings: ratingCount });
  },
  async createUser(req: Request, res: Response) {
    const { name, email, password, address, role } = req.body;
    const normalisedName = name.toLowerCase();
    const normalisedEmail = email.toLowerCase();
    const userData: User = {
      name: normalisedName,
      email: normalisedEmail,
      password,
      address,
      role,
    };
    await adminServices.createUser(userData);
    return res.status(201).json({ message: "Created" });
  },
  async getUser(req: Request, res: Response) {
    const users = await adminServices.getUser();
    return res.status(200).json(users);
  },
};
export default adminController;
