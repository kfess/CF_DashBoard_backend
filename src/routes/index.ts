import { Router } from "express";
import contestsRouter from "./contestRoutes";
import problemsRouter from "./problemRoutes";
import usersRouter from "./userRoutes";

const router = Router();
router.use("/api/contests", contestsRouter);
router.use("/api/problems", problemsRouter);
router.use("/api/users", usersRouter);

export default router;
