-- AlterTable
CREATE SEQUENCE problem_problemid_seq;
ALTER TABLE "Problem" ALTER COLUMN "problemId" SET DEFAULT nextval('problem_problemid_seq');
ALTER SEQUENCE problem_problemid_seq OWNED BY "Problem"."problemId";
