import { Router } from 'express';
import { PrismaSingleton } from '../repositories/prisma/prismaSingleton';
import { PrismaUserRepository } from '../repositories/prisma/prismaUserRepository';
import { UserInteractor } from '../usecases/UserInteractor';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

const prisma = PrismaSingleton.getInstance();
const userRepository = new PrismaUserRepository(prisma);
const userUsecase = new UserInteractor(userRepository);
const userController = new UserController(userUsecase);

// exchange code for access token, create user if not exists, and return jwt token
// this endpoint is called only in the development environment
// in production, this endpoint is never called directly
router.post('/exchange', (req, res) =>
  userController.exchangeCodeForAccessToken(req, res)
);

// exchange code for access token and return jwt token (do not create user)
// this endpoint is called only in the development environment
// in production, this endpoint is never called directly
router.post('/exchange-no-create', (req, res) =>
  userController.exchangeCodeForAccessTokenWithoutUserCreation(req, res)
);

// login with jwt token, when this function is called, new user is created if not exists
router.get('/login', authenticate, (req, res) =>
  userController.findOrCreateByGithubId(req, res)
);

// update codeforces username
router.put('/update', authenticate, (req, res) =>
  userController.updateCodeforcesUsername(req, res)
);

// get user
router.get('/find', authenticate, (req, res) =>
  userController.findByGithubId(req, res)
);

// verify jwt token
router.get('/verify', authenticate, (req, res) =>
  userController.verifyJWT(req, res)
);

export default router;
