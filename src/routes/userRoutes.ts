import "module-alias/register";
import { Router } from "express";
import { PrismaSingleton } from "../repositories/prisma/prismaSingleton";
import { PrismaUserRepository } from "@/repositories/prisma/prismaUserRepository";
import { UserInteractor } from "@/usecases/UserInteractor";
import { UserController } from "@/controllers/userController";

const router = Router();

const prisma = PrismaSingleton.getInstance();
const userRepository = new PrismaUserRepository(prisma);
const userUsecase = new UserInteractor(userRepository);
const userController = new UserController(userUsecase);

router.get("/findOrCreate", (req, res) =>
  userController.findOrCreateByGithubId(req, res)
);
router.put("/update", (req, res) =>
  userController.updateCodeforcesUsername(req, res)
);
router.delete("/delete/:githubId", (req, res) =>
  userController.delete(req, res)
);
router.post("/exchange", (req, res) =>
  userController.exchangeCodeForAccessToken(req, res)
);
router.get("/githubUser", (req, res) => userController.getGithubUser(req, res));

export default router;
