

export function competitionStatusCalculator(startDate:Date, endDate:Date):string {
    let status:string;
    const now:Date = new Date();
    if(new Date(startDate) > now) {
        status = "예정";
    }else if(new Date(startDate) <= now && new Date(endDate) >= now) {
        status = "진행중";
    }else {
        status = "완료";
    }

    return status
}