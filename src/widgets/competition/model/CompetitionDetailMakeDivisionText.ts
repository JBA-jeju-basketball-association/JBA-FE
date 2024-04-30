import {DivisionOptions} from "../../../shared/model/DivisionOptions";


export function competitionDetailMakeDivisionText(divisionList:string[]):string|undefined {
    let division:string|undefined = "";
    if (divisionList?.length === 1) {
        division = DivisionOptions.find(divisionOption => divisionOption.value === divisionList[0])?.label

    }else {
        division = "혼합("
        for (let i:number = 0; i<divisionList?.length; i++) {
            if (i === divisionList?.length-1) {
                division += DivisionOptions.find(divisionOption => divisionOption.value === divisionList[i])?.label + ")";
            }else {
                division += DivisionOptions.find(divisionOption => divisionOption.value === divisionList[i])?.label+ ", ";
            }
        }
    }
    return division;
}