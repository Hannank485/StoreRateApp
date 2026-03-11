import express from "express";
import ratingController from "../controller/ratingController";
import checkRole from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/:id", checkRole("USER"), ratingController.setRating);

export default router;
