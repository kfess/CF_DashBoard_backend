import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Request, Response } from 'express';
import { GetCustomContestUsecase } from '../usecases/GetCustomContestUsecase';
import { CustomContest } from '../entities/CustomContest';
import { Problem } from '../entities/Problem';
import { UserPayload } from './userController';
import { createCustomContestSchema } from '../validators/customContestSchema';

dayjs.extend(utc);

export class CustomContestController {
  constructor(private getCustomContestUsecase: GetCustomContestUsecase) {}

  async findByContestId(req: Request, res: Response): Promise<void> {
    try {
      const contestId = req.params.contestId;
      const contest =
        await this.getCustomContestUsecase.findByContestId(contestId);
      res.status(200).json(contest);
    } catch (error) {
      res.status(500).json({
        message: 'failed',
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { githubUsername } = (req.user as UserPayload) || {};
      const customContests =
        await this.getCustomContestUsecase.findAll(githubUsername);
      res.status(200).json(customContests);
    } catch (error) {
      res.status(500).json({
        message: 'failed',
      });
    }
  }

  async findMyContests(req: Request, res: Response): Promise<void> {
    try {
      const { githubUsername } = req.user as UserPayload;
      const customContests =
        await this.getCustomContestUsecase.findMyContests(githubUsername);
      res.status(200).json(customContests);
    } catch (error) {
      res.status(500).json({
        message: 'failed',
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      // zod validation
      const parsedBody = createCustomContestSchema.safeParse(req.body);
      if (!parsedBody.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: parsedBody.error.formErrors.fieldErrors, // エラーメッセージの詳細
        });
        return;
      }

      const {
        title,
        description,
        owner,
        ownerId,
        problems,
        startDate,
        endDate,
        penalty,
        mode,
        visibility,
        relatedTopics,
        participants,
      } = req.body;

      const customContestProblems = problems.map(
        (problem: Problem) => new Problem(problem)
      );

      const customContest = new CustomContest({
        title,
        description,
        owner,
        ownerId,
        problems: customContestProblems,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        penalty,
        mode,
        visibility,
        relatedTopics,
        participants,
      });

      const createdCustomContest =
        await this.getCustomContestUsecase.create(customContest);

      res.status(201).json(createdCustomContest);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'failed',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { githubUsername } = req.user as UserPayload;

      if (githubUsername !== req.body.ownerId) {
        res.status(403).json({
          message: 'forbidden',
        });
        return;
      }

      // zod validation
      const parsedBody = createCustomContestSchema.safeParse(req.body);
      if (!parsedBody.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: parsedBody.error.formErrors.fieldErrors, // エラーメッセージの詳細
        });
        return;
      }

      const customContest = req.body;
      const updatedContest =
        await this.getCustomContestUsecase.update(customContest);
      res.json(updatedContest);
    } catch (error) {
      res.status(500).json({
        message: 'failed',
      });
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
      res.status(500).json({
        message: 'failed',
      });
    }
  }

  async removeUserFromContest(req: Request, res: Response): Promise<void> {
    try {
      const { githubUsername } = req.user as UserPayload;

      if (githubUsername !== req.body.ownerId) {
        res.status(403).json({
          message: 'forbidden',
        });
        return;
      }

      const { participant, contestId } = req.body;
      await this.getCustomContestUsecase.removeUserFromContest(
        participant,
        contestId
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'failed',
      });
    }
  }
}
