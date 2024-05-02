export type competitionResultList = {
    floor:string;
    competitionResult: competitionResult[];
}

export type competitionResult = {
    division:string | null;
    startTime: Date;
    homeName: string;
    homeScore: number;
    awayName: string;
    awayScore: number;
    fileUrl: string;
    fileName: string;

}