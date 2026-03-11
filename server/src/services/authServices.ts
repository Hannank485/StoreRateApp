import bcrypt from "bcrypt";
import { appError, User } from "../type";
import jwt from "jsonwebtoken";
import authModels from "../models/authModels";
import config from "../config";
const authService = {
  // REGISTER
  async register(user: User) {
    if (user.name.length > 60 || user.name.length < 20) {
      throw new appError("Ensure username length is between 20-60 chars", 400);
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(user.password)) {
      throw new appError(
        "Please ensure password has an Uppercase Letter and a special character",
        400,
      );
    }
    if (user.address.length > 400) {
      throw new appError("Please keep address to below 400 chars", 400);
    }
    const emailRegex = /^[^\s@]+@+[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      throw new appError("Please ensure email is valid", 400);
    }
    const userExist = await authModels.findUserByEmail(user.email);
    if (userExist) {
      throw new appError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await authModels.register(user, hashedPassword);
  },

  // LOGIN
  async login(email: string, password: string) {
    const userData = await authModels.findUserByEmail(email);
    if (!userData) {
      throw new appError("Invalid Email/Password", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new appError("Invalid Email/Password", 400);
    }

    const accessToken = jwt.sign(
      { id: userData.id, role: userData.role },
      config.jwtToken,
      {
        expiresIn: "2h",
      },
    );
    return accessToken;
  },

  // CHECK AUTH
  async checkAuth(userId: number) {
    const user = await authModels.findUserById(userId);
    return user;
  },

  // PASSWORD UPDATE
  async updatePassword(password: string, userId: number) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      throw new appError(
        "Please ensure password has an Uppercase Letter and a special character",
        400,
      );
    }
    const user = await authModels.findUserById(userId);
    if (!user) {
      throw new appError("User not found", 401);
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (isPasswordSame) {
      throw new appError("Password cannot be the same", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await authModels.updatePassword(hashedPassword, userId);
  },
};

export default authService;
