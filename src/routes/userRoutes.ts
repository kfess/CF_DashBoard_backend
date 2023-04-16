import "module-alias/register";
import { Router } from "express";
import { PrismaSingleton } from "../repositories/prisma/prismaSingleton";
import { PrismaUserRepository } from "@/repositories/prisma/prismaUserRepository";
import { UserInteractor } from "@/usecases/UserInteractor";
import { UserController } from "@/controllers/userController";
import { authenticate } from "@/middlewares/authenticate";

const router = Router();

const prisma = PrismaSingleton.getInstance();
const userRepository = new PrismaUserRepository(prisma);
const userUsecase = new UserInteractor(userRepository);
const userController = new UserController(userUsecase);

// exchange code for access token, create user if not exists, and return jwt token
router.post("/exchange", (req, res) =>
  userController.exchangeCodeForAccessToken(req, res)
);

router.get("/findOrCreate", (req, res) =>
  userController.findOrCreateByGithubId(req, res)
);

// update codeforces username
router.put("/update", authenticate, (req, res) =>
  userController.updateCodeforcesUsername(req, res)
);

// delete user with github id
router.delete("/delete/:githubId", (req, res) =>
  userController.delete(req, res)
);

export default router;
