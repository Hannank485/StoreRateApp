import prisma from "../prismaClient";
import { User } from "../type";
const authModels = {
  async register(user: User, password: string) {
    return await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        address: user.address,
        password: password,
        role: user.role ?? "USER",
      },
    });
  },
  async findUserByEmail(email: string) {
    return await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  },
  async findUserById(id: number) {
    return await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  },
  async updatePassword(password: string, userId: number) {
    return await prisma.users.update({
      data: {
        password: password,
      },
      where: {
        id: userId,
      },
    });
  },
};

export default authModels;
