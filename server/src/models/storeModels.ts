import prisma from "../prismaClient";
import { Store } from "../type";
const storeModel = {
  async createStore(storeData: Store) {
    return await prisma.stores.create({
      data: {
        name: storeData.name,
        email: storeData.email,
        address: storeData.address,
        userId: storeData.userId,
      },
    });
  },

  async fetchSingleStore(email: string) {
    return await prisma.stores.findUnique({
      where: {
        email: email,
      },
      include: {
        rating: true,
      },
    });
  },

  async getAllStores() {
    return await prisma.stores.findMany({
      include: {
        rating: true,
      },
    });
  },
  async getStoreById(storeId: number) {
    return await prisma.stores.findUnique({
      where: {
        id: storeId,
      },
      include: {
        rating: {
          include: {
            users: true,
          },
        },
      },
    });
  },

  async getStoreByUser(userId: number) {
    return await prisma.stores.findMany({
      where: {
        userId: userId,
      },
      include: {
        rating: {
          include: {
            users: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  },
};

export default storeModel;
