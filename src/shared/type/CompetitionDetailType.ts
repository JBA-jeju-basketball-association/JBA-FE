export type competitionDetailData = {
    competitionId: number;
    title:string;
    content:string;
    startDate: Date;
    endDate: Date;
    relatedUrl: string;
    competitionDetailAttachedFiles:competitionDetailAttachedFiles[];
    places: places[];
    divisions: string[];

}

export type competitionDetailAttachedFiles = {
    competitionAttachedFileId: number;
    fileName: string;
    filePath: string;
}

export type places = {
    competitionPlaceId:number;
    address: string;
    placeName:string;
    latitude:number;
    longitude:number;
};
