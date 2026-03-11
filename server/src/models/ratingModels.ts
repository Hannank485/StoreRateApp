import prisma from "../prismaClient";

const ratingModels = {
  async setRating(userId: number, storeId: number, rating: number) {
    await prisma.ratings.upsert({
      where: {
        userId_storeId: { userId, storeId },
      },
      update: {
        rating: rating,
      },
      create: {
        userId: userId,
        storeId: storeId,
        rating: rating,
      },
    });
  },
  async getAllRating() {
    return await prisma.ratings.findMany();
  },
};

export default ratingModels;
