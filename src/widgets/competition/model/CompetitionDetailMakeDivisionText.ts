

export function CompetitionDetailMakeDivisionText(divisionList:string[]):string {
    let division:string | undefined = "";
    if (divisionList?.length === 1) {
        division = divisionList[0]
    }else {
        for (let i:number = 0; i < divisionList?.length; i++) {
            if (i === divisionList?.length-1) {
                division += divisionList[i];
            }else {
                division += divisionList[i]+ ", ";
            }
        }
    }
    return division;
}