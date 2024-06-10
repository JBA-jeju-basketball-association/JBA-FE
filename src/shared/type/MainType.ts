export type getMainCompetition = {
    competitionId: number;
    title: string;
    startDate: Date;
    endDate: Date;
    places: string[];
}

export type getMainAnnouncement = {
    postId: number;
    title: string;
    isAnnouncement: boolean;
    viewCount: number;
    writer: string;
    createAt: string;
    foreword: string | null;
}