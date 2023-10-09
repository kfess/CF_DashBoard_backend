import { Request, Response } from 'express';
import { UserUseCase } from '../usecases/UserUsecase';
import { verifyJWT } from '../utils/verifyJWT';

export interface UserPayload {
  githubId: number;
  githubUsername: string;
}

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  // between backend and frontend and github api server (exchange code for access token)
  // this endpoint is called only in the development environment
  async exchangeCodeForAccessToken(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    try {
      const accessToken =
        await this.userUseCase.exchangeCodeForAccessToken(code);
      const githubUser = await this.userUseCase.getGithubUser(accessToken);
      const jwtToken = this.userUseCase.createJWT(
        githubUser.id,
        githubUser.login
      );
      const expiresIn = 60 * 60 * 24 * 30; // 30 days
      const expirationTimestamp = Math.floor(Date.now() / 1000) + expiresIn; // 現在のタイムスタンプ + 30 days

      res.cookie('authToken', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: expiresIn * 1000,
      });
      res.status(200).json({
        githubId: githubUser.id,
        githubUsername: githubUser.login,
        isLoggedIn: true,
        expirationTimestamp: expirationTimestamp,
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed',
      });
    }
  }

  async findOrCreateByGithubId(req: Request, res: Response): Promise<void> {
    const { githubId, githubUsername } = req.user as UserPayload;
    try {
      const user = await this.userUseCase.findOrCreateByGithubId(
        githubId,
        githubUsername
      );
      res.status(200).json({
        ...user,
        isLoggedIn: true,
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed',
      });
    }
  }

  // to update codeforces username, authentification is required
  async updateCodeforcesUsername(req: Request, res: Response): Promise<void> {
    const { codeforcesUsername } = req.body;
    const { githubId } = req.user as UserPayload;

    try {
      const user = await this.userUseCase.updateCodeforcesUsername(
        githubId,
        codeforcesUsername
      );
      res.status(200).json({
        ...user,
        isLoggedIn: true,
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed',
      });
    }
  }

  async findByGithubId(req: Request, res: Response): Promise<void> {
    const { githubId } = req.user as UserPayload;

    try {
      const user = await this.userUseCase.findByGithubId(githubId);
      res.status(200).json({
        ...user,
        isLoggedIn: true,
      });
    } catch (error) {
      res.status(400).json({
        message: 'failed',
      });
    }
  }

  async verifyJWT(req: Request, res: Response): Promise<void> {
    const token = req.cookies.authToken || req.headers['authorization'];

    if (token && verifyJWT(token)) {
      res.status(200).json({
        message: 'valid token',
      });
    } else {
      res.status(401).json({
        message: 'invalid token',
      });
    }
  }
}
