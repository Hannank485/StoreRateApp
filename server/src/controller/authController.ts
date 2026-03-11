import type { Request, Response } from "express";
import authService from "../services/authServices";
import { appError, User, UserRequest } from "../type";

const authController = {
  // REGISTER
  async register(req: Request, res: Response) {
    const {
      name,
      password,
      email,
      address,
    }: { name: string; password: string; email: string; address: string } =
      req.body;
    const normalisedName = name.toLowerCase();
    const normalisedEmail = email.toLowerCase();
    const user: User = {
      name: normalisedName,
      password,
      email: normalisedEmail,
      address,
    };
    await authService.register(user);
    return res.status(201).json({ message: "User Created" });
  },

  // LOGIN
  async login(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body;
    const normalisedEmail = email.toLowerCase();
    const accessToken = await authService.login(normalisedEmail, password);
    res.cookie("accessToken", accessToken, {
      secure: true,
      sameSite: false,
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User Logged In" });
  },

  // LOGOUT
  async logout(req: Request, res: Response) {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged Out Successfully" });
  },

  // CheckAuth
  async checkAuth(req: UserRequest, res: Response) {
    const userId = req.userId;
    if (!userId) {
      throw new appError("Invalid Data", 400);
    }

    const user = await authService.checkAuth(userId);
    if (!user) {
      throw new appError("Unauthorized", 403);
    }
    return res.status(200).json({ role: user.role, id: user.id });
  },

  // Update Password
  async updatePassword(req: UserRequest, res: Response) {
    const { password } = req.body;
    const userId = req.userId;
    if (!password || !userId) {
      throw new appError("Invalid Data", 400);
    }
    await authService.updatePassword(password, userId);
    return res.status(200).json({ message: "Updated" });
  },
};

export default authController;
