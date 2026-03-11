import type { Response } from "express";
import { UserRequest } from "../type";
import ratingServices from "../services/ratingServices";

const ratingController = {
  async setRating(req: UserRequest, res: Response) {
    const userId = req.userId;
    if (!userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const storeId = Number(req.params.id);
    const { rating } = req.body;
    await ratingServices.setRating(userId, storeId, rating);
    return res.status(200).json({ message: "Rated" });
  },
  async updateRating() {},
};

export default ratingController;
