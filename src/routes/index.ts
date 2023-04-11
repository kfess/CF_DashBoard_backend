import { Router } from "express";
import contestsRouter from "./contestRoutes";
import problemsRouter from "./problemRoutes";

const router = Router();
router.use("/contests", contestsRouter);
router.use("/problems", problemsRouter);

export default router;
