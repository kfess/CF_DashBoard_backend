import { Router } from "express";
import contestsRouter from "./contestRoutes";
import problemsRouter from "./problemRoutes";

const router = Router();
router.use("/api/contests", contestsRouter);
router.use("/api/problems", problemsRouter);

export default router;
