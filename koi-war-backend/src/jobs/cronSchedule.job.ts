import { AppContext } from "../context/appContext";
import { ICompetitionManagementServices } from "../services/ICompetitionManagementServices";
import cron from "node-cron";

export function initializeCronScheduleJobs() {
    const competitionManagementServices = AppContext.get<ICompetitionManagementServices>("CompetitionManagementServices");

    cron.schedule("0 0 * * *", async () => {
        try {
            await competitionManagementServices.updateRankingEndedContestInstances();
            console.log("Ranking updated successfully");
        } catch (error) {
            console.error("Error updating ranking:", error);
        }
    });
}