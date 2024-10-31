import {IContestInstanceServices} from "../IContestInstanceServices";
import {IContestInstanceRepository} from "../../repositories/IContestInstanceRepository";
import {IContestInstance} from "../../models/contestInstance.model";
import {IContestInstanceResponse, mapContestInstanceResponse,} from "../../types/contestInstance";
import {parseDateFromString} from "../../utils/format.utils";
import { IContestServices } from "../IContestServices";

export class ContestInstanceServices implements IContestInstanceServices {
    private contestInstanceRepository: IContestInstanceRepository;
    private contestServices: IContestServices;

    constructor(contestInstanceRepository: IContestInstanceRepository, contestServices: IContestServices) {
        this.contestInstanceRepository = contestInstanceRepository;
        this.contestServices = contestServices;
    }

    async createContestInstance(data: any): Promise<IContestInstanceResponse> {
        try {
            // Xử lý chuyển đổi ngày tháng
            const processedData = {...data};

            if (typeof data.startDate === 'string') {
                const parsedStartDate = parseDateFromString(data.startDate);
                if (!parsedStartDate) {
                    throw new Error("Invalid start date format. Use dd-MM-yyyy");
                }
                processedData.startDate = parsedStartDate;
            }

            if (typeof data.endDate === 'string') {
                const parsedEndDate = parseDateFromString(data.endDate);
                if (!parsedEndDate) {
                    throw new Error("Invalid end date format. Use dd-MM-yyyy");
                }
                processedData.endDate = parsedEndDate;
            }

            // Validate dates
            if (processedData.startDate && processedData.endDate) {
                const startDate = processedData.startDate as Date;
                const endDate = processedData.endDate as Date;

                if (endDate < startDate) {
                    throw new Error("End date must be after start date");
                }
            }

            const contest = await this.contestServices.getContestById(data.contest);

            if (!contest) {
                throw new Error("Contest not found");
            }

            const contestInstance = await this.contestInstanceRepository.createContestInstance(processedData);
            return mapContestInstanceResponse(
                contestInstance as IContestInstance & {
                    _id: string;
                    createdAt: Date;
                    updatedAt: Date;
                }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Failed to create contest instance");
        }
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

    async getEndedContestInstances(): Promise<IContestInstanceResponse[]> {
        try {
            const contestInstances = await this.contestInstanceRepository.getEndedContestInstances();
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

    async updateContestInstanceRankedStatus(id: string): Promise<IContestInstanceResponse | null> {
        const contestInstance = await this.contestInstanceRepository.updateContestInstanceRankedStatus(id);
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

    async deleteContestInstanceById(id: string): Promise<IContestInstanceResponse | null> {
        const contestInstance = await this.contestInstanceRepository.deleteContestInstanceById(id);
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
}
