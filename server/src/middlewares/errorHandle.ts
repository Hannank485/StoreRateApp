import { Request, Response, NextFunction } from "express";
import { appError } from "../type";

export default async function errorHandle(
  err: Error | appError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof appError) {
    return res.status(err.status).json({ message: err.message });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
