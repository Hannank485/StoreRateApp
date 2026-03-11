import ratingModels from "../models/ratingModels";
import storeModel from "../models/storeModels";
import { appError } from "../type";

const ratingServices = {
  async setRating(userId: number, storeId: number, rating: number) {
    if (rating > 5 || rating < 0) {
      throw new appError("Rating should be 0-5 Value", 400);
    }
    await ratingModels.setRating(userId, storeId, rating);
  },
};

export default ratingServices;
