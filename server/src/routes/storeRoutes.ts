import express from "express";
import checkRole from "../middlewares/roleMiddleware";
import storeController from "../controller/storeController";

const router = express.Router();

router.get("/", storeController.getStore);
router.get("/me", storeController.getStoreByUser);
router.get("/:id", checkRole("OWNER"), storeController.getStoreById);

export default router;
