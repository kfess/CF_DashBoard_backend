export class User {
  id: string;
  githubId: string;
  githubUsername: string;
  codeforcesUsername?: string;

  constructor(
    id: string,
    githubId: string,
    githubUsername: string,
    codeforcesUsername?: string
  ) {
    this.id = id;
    this.githubId = githubId;
    this.githubUsername = githubUsername;
    this.codeforcesUsername = codeforcesUsername;
  }
}
