import { Request } from "express";

export interface UserPayload {
  githubId: number;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}
