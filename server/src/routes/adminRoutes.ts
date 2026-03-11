import express from "express";
import adminController from "../controller/adminController";

const router = express.Router();

router.get("/dashboard", adminController.dashboard);
router.post("/users", adminController.createUser);
router.get("/users", adminController.getUser);
router.post("/stores", adminController.createStore);

export default router;
