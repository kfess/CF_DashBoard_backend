import { Request, Response } from "express";
import { UserUseCase } from "@/usecases/UserUsecase";
import { verifyJWT } from "@/utils/verifyJWT";

export interface UserPayload {
  githubId: number;
  githubUsername: string;
}

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  // between backend and frontend and github api server (exchange code for access token)
  async exchangeCodeForAccessToken(req: Request, res: Response): Promise<void> {
    const { code } = req.body;
    try {
      const accessToken = await this.userUseCase.exchangeCodeForAccessToken(
        code
      );
      const githubUser = await this.userUseCase.getGithubUser(accessToken);
      await this.userUseCase.findOrCreateByGithubId(
        githubUser.id,
        githubUser.login
      );
      const jwtToken = this.userUseCase.createJWT(
        githubUser.id,
        githubUser.login
      );

      res.cookie("authToken", jwtToken, {
        httpOnly: true,
        // secure: true, // for https
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.status(200).json({
        githubId: githubUser.id,
        githubUsername: githubUser.login,
      });
    } catch (error) {
      res.status(400).json({ message: "failed" });
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
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  }

  async findByGithubId(req: Request, res: Response): Promise<void> {
    const { githubId } = req.user as UserPayload;

    try {
      const user = await this.userUseCase.findByGithubId(githubId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  }

  async verifyJWT(req: Request, res: Response): Promise<void> {
    const token = req.cookies.authToken || req.headers["authorization"];

    if (token && verifyJWT(token)) {
      res.status(200).json({ message: "valid token" });
    } else {
      res.status(401).json({ message: "invalid token" });
    }
  }
}
