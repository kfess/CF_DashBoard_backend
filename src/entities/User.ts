export class User {
  githubId: string;
  githubUsername: string;
  codeforcesUsername?: string;

  constructor(
    githubId: string,
    githubUsername: string,
    codeforcesUsername?: string
  ) {
    this.githubId = githubId;
    this.githubUsername = githubUsername;
    this.codeforcesUsername = codeforcesUsername;
  }
}
