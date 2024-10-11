import { IFish } from "../models/fish.model";

export interface IFishProfileResponse {
  name: string;
  description: string;
  image: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export function mapFishProfileResponse(
  fishProfile: IFish & { _id: string; createdAt: Date; updatedAt: Date }
): IFishProfileResponse {
  return {
    name: fishProfile.name,
    description: fishProfile.description ?? "",
    image: fishProfile.images ? fishProfile.images[0] : "",
    _id: fishProfile._id,
    createdAt: fishProfile.createdAt,
    updatedAt: fishProfile.updatedAt,
  };
}
