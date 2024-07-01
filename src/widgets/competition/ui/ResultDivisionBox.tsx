import React from 'react';
import style from "./ResultDivisionBox.module.css";
import {getCompetitionResult, getCompetitionResultRow} from "../../../shared/type/CompetitionType";
import {ResultRow} from "./ResultRow";

type Props = {
    data: getCompetitionResult;
}
export const ResultDivisionBox = ({data}:Props) => {
    return (
        <div className={style.ResultDivisionBox}>
            <p className={style.division}>{data.division}</p>
            <div className={style.rowArea}>
                {data.getResultResponseRows.map((item: getCompetitionResultRow, index: number) => {
                    return <ResultRow key={index} data={item}/>
                })}
            </div>
        </div>
    );
};
