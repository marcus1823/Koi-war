import { IContestInstance } from "../models/contestInstance.model";
import { IContest } from "../models/contest.model";

export interface IContestInstanceResponse {
  contest: IContest;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description?: string;
  rules?: string;
  images?: string;
}
export function mapContestInstanceResponse(
  contestInstance: IContestInstance & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }
): IContestInstanceResponse {
  return {
    contest: contestInstance.contest,
    name: contestInstance.name,
    startDate: contestInstance.startDate,
    endDate: contestInstance.endDate,
    isActive: contestInstance.isActive,
    description: contestInstance.description ?? "",
    rules: contestInstance.rules ?? "",
    images: contestInstance.images ? contestInstance.images[0] : "",
  };
}
