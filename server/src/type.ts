import type { Request } from "express";

export interface UserRequest extends Request {
  userId?: number;
  userRole?: string;
}

export class appError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export type User = {
  name: string;
  email: string;
  password: string;
  address: string;
  role?: "USER" | "ADMIN" | "OWNER";
};

export type Store = {
  name: string;
  email: string;
  address: string;
  userId: number;
};
