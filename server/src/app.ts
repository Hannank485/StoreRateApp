import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import errorHandle from "./middlewares/errorHandle";
import storeRouter from "./routes/storeRoutes";
import ratingRouter from "./routes/ratingRoutes";
import authMiddleware from "./middlewares/authMiddleware";
import checkRole from "./middlewares/roleMiddleware";
import adminRouter from "./routes/adminRoutes";
import cors from "cors";
const app = express();
app.use(express.json());

app.use(cookieParser());
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/stores", authMiddleware, storeRouter);
app.use("/api/rating", authMiddleware, ratingRouter);
app.use("/api/admin", authMiddleware, checkRole("ADMIN"), adminRouter);
app.use(errorHandle);
export default app;
