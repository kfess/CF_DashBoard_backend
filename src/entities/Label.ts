export class Label {
  public id: number;
  public githubId: string;
  public name: string;
  public description: string;
  public color: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: number,
    githubId: string,
    name: string,
    description: string,
    color: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.githubId = githubId;
    this.name = name;
    this.description = description;
    this.color = color;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ProblemLabel {
  public id: number;
  public problemId: number;
  public labelId: number;

  constructor(id: number, problemId: number, labelId: number) {
    this.id = id;
    this.problemId = problemId;
    this.labelId = labelId;
  }
}

export class ContestLabel {
  public id: number;
  public contestId: number;
  public labelId: number;

  constructor(id: number, contestId: number, labelId: number) {
    this.id = id;
    this.contestId = contestId;
    this.labelId = labelId;
  }
}
