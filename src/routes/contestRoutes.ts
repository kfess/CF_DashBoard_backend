import { Router } from "express";
import { PrismaSingleton } from "../repositories/prisma/prismaSingleton";
import { PrismaContestRepository } from "../repositories/prisma/PrismaContestRepository";
import { GetContestsInteractor } from "../usecases/GetContestsInteractor";
import { ContestController } from "../controllers/contestController";

const router = Router();

const prisma = PrismaSingleton.getInstance();
const contestRepository = new PrismaContestRepository(prisma);
const getContestsUsecase = new GetContestsInteractor(contestRepository);
const contestController = new ContestController(getContestsUsecase);

router.get("/", (req, res) => contestController.getAllContests(req, res));

export default router;
