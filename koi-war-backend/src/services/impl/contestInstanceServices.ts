import { IContestInstanceServices } from "../IContestInstanceServices";
import { IContestInstanceRepository } from "../../repositories/IContestInstanceRepository";
import { IContestInstance } from "../../models/contestInstance.model";
import {
  IContestInstanceResponse,
  mapContestInstanceResponse,
} from "../../types/contestInstance";
import { parseDateFromString } from "../../utils/format.utils";

export class ContestInstanceServices implements IContestInstanceServices {
  private contestInstanceRepository: IContestInstanceRepository;

  constructor(contestInstanceRepository: IContestInstanceRepository) {
    this.contestInstanceRepository = contestInstanceRepository;
  }

  async createContestInstance(data: any): Promise<IContestInstanceResponse> {
    const contestInstance =
      await this.contestInstanceRepository.createContestInstance(data);
    return mapContestInstanceResponse(
      contestInstance as IContestInstance & {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      }
    );
  }

  async getAllContestInstances(): Promise<IContestInstanceResponse[]> {
    try {
        const contestInstances = await this.contestInstanceRepository.getAllContestInstances();
        return contestInstances.map((contestInstance) =>
            mapContestInstanceResponse(
                contestInstance as IContestInstance & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
            )
        );
    } catch (error) {
        throw error;
    }
  }

  async getContestInstanceById(
    id: string
  ): Promise<IContestInstanceResponse | null> {
    const contestInstance =
      await this.contestInstanceRepository.getContestInstanceById(id);
    if (!contestInstance) {
      throw new Error("Contest instance not found");
    }
    return mapContestInstanceResponse(
      contestInstance as IContestInstance & {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      }
    );
  }

    async updateContestInstanceById(
        id: string, 
        updateData: Partial<IContestInstance>
    ): Promise<IContestInstanceResponse | null> {
        try {
            // Convert dates if they exist in updateData
            const processedData: Partial<IContestInstance> = {
                ...updateData
            };

            if (typeof updateData.startDate === 'string') {
                const parsedStartDate = parseDateFromString(updateData.startDate);
                if (!parsedStartDate) {
                    throw new Error("Invalid start date format. Use dd-MM-yyyy");
                }
                processedData.startDate = parsedStartDate;
            }

            if (typeof updateData.endDate === 'string') {
                const parsedEndDate = parseDateFromString(updateData.endDate);
                if (!parsedEndDate) {
                    throw new Error("Invalid end date format. Use dd-MM-yyyy");
                }
                processedData.endDate = parsedEndDate;
            }

            // Validate dates if both exist
            if (processedData.startDate && processedData.endDate) {
                const startDate = processedData.startDate as Date;
                const endDate = processedData.endDate as Date;
                
                if (endDate < startDate) {
                    throw new Error("End date must be after start date");
                }
            }

            const contestInstance = await this.contestInstanceRepository.updateContestInstanceById(
                id,
                processedData
            );

            if (!contestInstance) {
                throw new Error("Contest instance not found");
            }

            return mapContestInstanceResponse(
                contestInstance as IContestInstance & { 
                    _id: string; 
                    createdAt: Date; 
                    updatedAt: Date 
                }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to update contest instance");
        }
    }

    async disableContestInstanceById(id: string): Promise<IContestInstanceResponse | null> {
        const contestInstance = await this.contestInstanceRepository.disableContestInstanceById(id);
        if (!contestInstance) {
            throw new Error("Contest instance not found");
        }
        return mapContestInstanceResponse(
            contestInstance as IContestInstance & { _id: string; createdAt: Date; updatedAt: Date }
        );  
    }
}
