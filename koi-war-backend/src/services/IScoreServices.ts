export interface IScoreServices {
    createScore(data: {
        registration: string;
        bodyScore: number;
        patternScore: number;
        colorScore: number;
        referee: string;
    }): Promise<any>;

    getScoreByRegistrationId(registrationId: string): Promise<any>;

    checkRefereeIsScored(registrationId: string, refereeId: string): Promise<boolean>;
}
