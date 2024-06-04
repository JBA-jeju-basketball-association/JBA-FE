export type value = {
    label: string;
    value: string;
}

export type requestData = {
    title: string;
    divisions: string[];
    startDate: Date | null;
    endDate: Date | null;
    places: place[];
    relatedURL: string | null;
    ckData:any;
    realCkImgs:string[];
}

export type IFileTypes = {
    id: number;
    object: File;
}

export type updateRequestData = {
    title: string;
    divisions: string[] | undefined;
    startDate: Date | null;
    endDate: Date | null;
    updatePlaces: place[];
    relatedURL: string | null;
    ckData:any;
    realCkImgs:string[];
    uploadedAttachedFiles:string[];
    deletedCkImgUrls: string[]
}


export type competitionListItem = {
    competitionId: number;
    division: string;
    startDate: Date;
    endDate: Date;
    title: string;
}

export type competitionDetailData = {
    competitionId: number;
    title:string;
    content:string;
    startDate: Date;
    endDate: Date;
    relatedUrl: string;
    competitionDetailAttachedFiles:competitionDetailAttachedFile[];
    places: place[];
    divisions: string[];
    existResult:boolean;
    ckImgUrls: string[];
}

export type competitionDetailAttachedFile = {
    competitionAttachedFileId: number;
    fileName: string;
    filePath: string;
}

export type place = {
    competitionPlaceId?:number;
    address: string;
    placeName:string;
    latitude:number;
    longitude:number;
};


export type competitionResultList = {
    floor:string;
    competitionResult: competitionResult[];
}

export type competitionResult = {
    competitionResultId?: number;
    division:string;
    startTime: Date;
    homeName: string;
    homeScore: number;
    awayName: string;
    awayScore: number;
    fileUrl: string;
    fileName: string;
}
