import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { UserRequest } from "../type";

export default async function authMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(403).json({ message: "UNAUTHORISED" });
  }
  try {
    const decode = jwt.verify(token, config.jwtToken) as {
      id: number;
      role: string;
    };
    req.userId = decode.id;
    req.userRole = decode.role;
    next();
  } catch (err) {
    next(err);
  }
}
