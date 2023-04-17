import { Request, Response } from "express";
import { GetProblemsUsecase } from "@/usecases/GetProblemsUsecase";

export class ProblemController {
  constructor(private getProblemsUsecase: GetProblemsUsecase) {}

  async getAllProblems(req: Request, res: Response): Promise<void> {
    try {
      const problems = await this.getProblemsUsecase.getAllProblems();
      res.status(200).json(problems);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed" });
    }
  }
}
