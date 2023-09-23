export class User {
  githubId: number;
  githubUsername: string;
  codeforcesUsername?: string;

  constructor(
    githubId: number,
    githubUsername: string,
    codeforcesUsername?: string,
  ) {
    this.githubId = githubId;
    this.githubUsername = githubUsername;
    this.codeforcesUsername = codeforcesUsername;
  }
}
