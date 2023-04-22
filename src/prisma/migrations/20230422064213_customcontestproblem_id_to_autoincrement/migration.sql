-- DropIndex
DROP INDEX "CustomContestProblem_id_key";

-- AlterTable
CREATE SEQUENCE customcontestproblem_id_seq;
ALTER TABLE "CustomContestProblem" ALTER COLUMN "id" SET DEFAULT nextval('customcontestproblem_id_seq');
ALTER SEQUENCE customcontestproblem_id_seq OWNED BY "CustomContestProblem"."id";
