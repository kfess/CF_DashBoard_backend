import { GetContestsUsecase } from "@/usecases/GetContestsUsecase";

export const resolvers = {
  Query: {
    contests: async (
      _: any,
      __: any,
      { getContestsUsecase }: { getContestsUsecase: GetContestsUsecase }
    ) => {
      return await getContestsUsecase.getAllContests();
    },
    contest: async (
      _: any,
      { id }: { id: number },
      { getContestsUsecase }: { getContestsUsecase: GetContestsUsecase }
    ) => {
      return await getContestsUsecase.getContest(id);
    },
  },
};
