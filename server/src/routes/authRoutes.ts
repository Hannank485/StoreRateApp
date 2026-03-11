import express from "express";
import authController from "../controller/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.checkAuth);
router.post("/logout", authController.logout);
router.patch("/", authMiddleware, authController.updatePassword);

export default router;
