import { Request, Response } from "express";
import { GetCustomContestUsecase } from "@/usecases/GetCustomContestUsecase";
import { CustomContest, CustomContestProblem } from "@/entities/CustomContest";

export class CustomContestController {
  constructor(private getCustomContestUsecase: GetCustomContestUsecase) {}

  async getByContestId(req: Request, res: Response): Promise<void> {
    try {
      const contestId = req.params.contestId;
      const contest = await this.getCustomContestUsecase.getByContestId(
        contestId
      );
      res.status(200).json(contest);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const customContests = await this.getCustomContestUsecase.getAll();
      res.json(customContests);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async getByOwnerId(req: Request, res: Response): Promise<void> {
    try {
      const ownerId = req.params.ownerId as string;
      console.log(ownerId);
      const customContests = await this.getCustomContestUsecase.getByOwnerId(
        ownerId
      );
      res.json(customContests);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        title,
        description,
        owner,
        ownerId,
        problems,
        startTime,
        endTime,
        penalty,
        mode,
        visibility,
        participants,
      } = req.body;

      const customContestProblems = problems.map(
        (problem: CustomContestProblem) => new CustomContestProblem(problem)
      );

      const customContest = new CustomContest({
        title,
        description,
        owner,
        ownerId,
        problems: customContestProblems,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        penalty,
        mode,
        visibility,
        participants,
      });

      res.status(201).json(customContest);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const customContest = req.body;
      const updatedContest = await this.getCustomContestUsecase.update(
        customContest
      );
      res.json(updatedContest);
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }

  async addUserToContest(req: Request, res: Response): Promise<void> {
    try {
      const { participant, contestId } = req.body;
      await this.getCustomContestUsecase.addUserToContest(
        participant,
        contestId
      );
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed" });
    }
  }

  async removeUserFromContest(req: Request, res: Response): Promise<void> {
    try {
      const { participant, contestId } = req.body;
      await this.getCustomContestUsecase.removeUserFromContest(
        participant,
        contestId
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  }
}
