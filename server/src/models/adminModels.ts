import prisma from "../prismaClient";

const adminModels = {
  async fetchAllUsers() {
    return await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        stores: {
          include: {
            rating: true,
          },
        },
      },
    });
  },
  async dashboard() {
    const userCount = await prisma.users.count();
    const storeCount = await prisma.stores.count();
    const ratingCount = await prisma.ratings.count();
    return { userCount, storeCount, ratingCount };
  },
};

export default adminModels;
