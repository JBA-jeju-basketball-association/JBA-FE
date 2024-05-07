import React from 'react';
import style from "./ResultList.module.css"
import {getResult, getResultBox} from "../../../shared/type/CompetitionResultType";
import {ResultRow} from "./ResultRow";


type Props = {
    resultList: getResultBox;
    divisionSelect: string;
}
export const ResultList = ({resultList, divisionSelect}:Props) => {

    let filteredResult: getResult[] = [];
    if (divisionSelect === "all") {
        filteredResult = resultList.resultList;
    }else {
        filteredResult = resultList.resultList.filter(item => item.division === divisionSelect)
    }
    return (
        <div className={style.ResultList}>
            <div className={style.floorArea}>
                <p>{resultList.floor}</p>
            </div>
            <div className={style.rowArea}>
                {filteredResult.map((results:getResult, index:number) => {
                        return <ResultRow results={results} key={index}/>;
                })}
            </div>

        </div>
    );
};
