import adminModels from "../models/adminModels";
import authModels from "../models/authModels";
import { appError, User } from "../type";
import bcrypt from "bcrypt";
const adminServices = {
  async dashboard() {
    const { userCount, storeCount, ratingCount } =
      await adminModels.dashboard();
    return { userCount, storeCount, ratingCount };
  },
  async createUser(user: User) {
    const userExist = await authModels.findUserByEmail(user.email);
    if (userExist) {
      throw new appError("User Already Exists", 400);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await authModels.register(user, hashedPassword);
  },
  async getUser() {
    const users = await adminModels.fetchAllUsers();
    return users;
  },
};

export default adminServices;
