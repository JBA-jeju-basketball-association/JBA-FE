import {ckEditorResponse} from "../../features/ckEditor/ui/CkEditor";

export type requestData = {
    title: string;
    divisions: string[];
    startDate: Date | null;
    endDate: Date | null;
    places: place[];
    relatedURL: string | null;
    ckData:any;
    ckImgRequests:ckEditorResponse[];
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
    ckImgRequests:ckEditorResponse[];
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

export type postCompetitionSchedule = {
    division:string;
    postCompetitionScheduleRow: postCompetitionScheduleRow[];
}

export type postCompetitionScheduleRow = {
    gameNumber: number;
    startDate: Date | null;
    floor: string;
    place: string;
    homeName: string;
    awayName: string;
    state5x5: boolean;
}

export type getScheduleResponse = {
    division: string;
    getScheduleRows: getScheduleResponseRow[]
}

export type getScheduleResponseRow = {
    competitionResultId: number;
    gameNumber: number;
    startDate: Date | null;
    floor: string;
    place: string;
    homeName: string;
    awayName: string;
    state5x5: boolean;
}

export interface postCompetitionResult {
    division: string;
    postResultRequestRows: postResultRequestRows[];
}

export interface postResultRequestRows extends postCompetitionScheduleRow{
    competitionResultId: number | null;
    homeScore: number | null;
    awayScore: number | null;
    filePath: string | null;
    fileName: string;
}

export type getCompetitionResult = {
    division: string;
    getResultResponseRows: getCompetitionResultRow[];
}

export type getCompetitionResultRow = {
    competitionResultId: number;
    gameNumber: number;
    startDate: Date | null;
    floor: string;
    place: string;
    homeName: string;
    homeScore: number;
    awayName: string;
    awayScore: number;
    filePath: string;
    fileName: string;
    state5x5: boolean;
}

export type divisionType = {
    value:string;
    label:string
}