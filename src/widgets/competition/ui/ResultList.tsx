import React from 'react';
import style from "./ResultList.module.css"
import {competitionResult, competitionResultList} from "../../../shared/type/CompetitionType";
import {ResultRow} from "./ResultRow";


type Props = {
    resultList: competitionResultList;
    divisionSelect: string;
}
export const ResultList = ({resultList, divisionSelect}:Props) => {

    let filteredResult: competitionResult[] = [];
    if (divisionSelect === "all") {
        filteredResult = resultList.competitionResult;
    }else {
        filteredResult = resultList.competitionResult.filter(item => item.division === divisionSelect)
    }
    return (
        <div className={style.ResultList}>
            <div className={style.floorArea}>
                <p>{resultList.floor}</p>
            </div>
            <div className={style.rowArea}>
                {/*{filteredResult.map((results:competitionResult, index:number) => {*/}
                {/*        return <ResultRow results={results} key={index}/>;*/}
                {/*})}*/}
            </div>

        </div>
    );
};
