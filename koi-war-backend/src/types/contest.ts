import { IContest } from "../models/contest.model";

export interface IContestResponse {
  id: string;
  name: string;
  description: string;
}

export function mapContestResponse(
  contest: IContest & { _id: string; createdAt: Date; updatedAt: Date }
): IContestResponse {
  return {
    id: contest._id,
    name: contest.name,
    description: contest.description ?? "",
  };
}
