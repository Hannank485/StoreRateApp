import { Response, NextFunction } from "express";
import { UserRequest } from "../type";

export default function checkRole(...roles: string[]) {
  function roleMiddleware(req: UserRequest, res: Response, next: NextFunction) {
    if (!req.userRole) {
      return res.status(403).json({ message: "FORBIDDEN" });
    }
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: "FORBIDDEN" });
    }
    next();
  }
  return roleMiddleware;
}
