import { Router } from 'express';
import { PrismaSingleton } from '../repositories/prisma/prismaSingleton';
import { PrismaProblemRepository } from '../repositories/prisma/PrismaProblemRepository';
import { GetProblemsInteractor } from '../usecases/GetProblemsInteractor';
import { ProblemController } from '../controllers/problemController';

const router = Router();

const prisma = PrismaSingleton.getInstance();
const problemRepository = new PrismaProblemRepository(prisma);
const getProblemsUsecase = new GetProblemsInteractor(problemRepository);
const problemController = new ProblemController(getProblemsUsecase);

router.get('/', (req, res) => problemController.getAllProblems(req, res));

export default router;
