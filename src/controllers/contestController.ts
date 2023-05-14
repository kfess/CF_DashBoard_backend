import { Request, Response } from "express";
import { GetContestsUsecase } from "../usecases/GetContestsUsecase";

export class ContestController {
  constructor(private getContestsUsecase: GetContestsUsecase) {}

  async getAllContests(req: Request, res: Response): Promise<void> {
    try {
      const contests = await this.getContestsUsecase.getAllContests();
      res.status(200).json(contests);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }
}
