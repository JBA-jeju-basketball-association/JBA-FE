export type place = {
    name : string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
}

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

export type competitionListItem = {
    competitionId: number;
    division: string;
    startDate: Date;
    endDate: Date;
    title: string;
}