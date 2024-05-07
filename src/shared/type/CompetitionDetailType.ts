export type competitionDetailData = {
    competitionId: number;
    title:string;
    content:string;
    startDate: Date;
    endDate: Date;
    relatedUrl: string;
    competitionDetailAttachedFiles:competitionDetailAttachedFiles[];
    places: place[];
    divisions: string[];
    existResult:boolean;
}

export type competitionDetailAttachedFiles = {
    competitionAttachedFileId: number;
    fileName: string;
    filePath: string;
}

export type place = {
    competitionPlaceId:number;
    address: string;
    placeName:string;
    latitude:number;
    longitude:number;
};
