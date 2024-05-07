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

export type getResultResponse = {
    divisionList: string[];
    resultResponse: getResultBox
}

export type getResultBox = {
    floor: string;
    resultList: getResult[];
}

export type getResult = {
    division:string;
    time: Date;
    homeName: string;
    homeScore: number;
    awayName: string;
    awayScore: number;
    filePath: string;
    fileName: string;
}
