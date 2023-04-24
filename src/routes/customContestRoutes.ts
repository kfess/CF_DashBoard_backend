import "module-alias/register";
import { Router } from "express";
import { PrismaSingleton } from "../repositories/prisma/prismaSingleton";
import { PrismaCustomContestRepository } from "../repositories/prisma/PrismaCustomContestRepository";
import { GetCustomContestInteractor } from "@/usecases/GetCustomContestInteractor";
import { CustomContestController } from "@/controllers/customContestController";
import { getUserIfExist } from "@/middlewares/getUserIfExist";
import { authenticate } from "@/middlewares/authenticate";

const router = Router();

const prisma = PrismaSingleton.getInstance();
const customContestRepository = new PrismaCustomContestRepository(prisma);
const getCustomContestUsecase = new GetCustomContestInteractor(
  customContestRepository
);
const customContestController = new CustomContestController(
  getCustomContestUsecase
);

router.get("/:contestId", (req, res) =>
  customContestController.findByContestId(req, res)
);

router.get("/all-contests", getUserIfExist, (req, res) =>
  customContestController.findAll(req, res)
);

router.get("/my-contests", authenticate, (req, res) => {
  customContestController.findMyContests(req, res);
});

router.post("/", (req, res) => customContestController.create(req, res));

router.put("/", authenticate, (req, res) =>
  customContestController.update(req, res)
);

router.post("/add-user", (req, res) =>
  customContestController.addUserToContest(req, res)
);

router.post("/remove-user", authenticate, (req, res) => {
  customContestController.removeUserFromContest(req, res);
});

export default router;
