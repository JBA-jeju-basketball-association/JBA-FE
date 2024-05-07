import React from 'react';
import style from "./ResultRow.module.css"
import {getResult} from "../../../shared/type/CompetitionResultType";
import formatDate from "../../../shared/lib/formatDate";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";


type Props = {
    results:getResult;
}
export const ResultRow = ({results}:Props) => {

    const fileLocationHandler =  () => {
        if (results.filePath !== "" && results.fileName !== null) {
            window.location.href = results.filePath
        }else {
            alert("경기기록이 없습니다.")
        }
    }
    return (
        <div className={style.ResultRow}>
            <div className={style.timeArea}>
                <p>{formatDate(new Date(results.time))}</p>
            </div>
            <div className={style.divisionArea}>
                <p>{DivisionOptions.map((item => item.value === results.division ? item.label : ""))}</p>
            </div>
            <div className={style.pointArea}>
                <p className={style.teamName}>{results.homeName}</p>
                <p className={results.homeScore > results.awayScore ? style.winPoint : ""}>{results.homeScore}</p>
                <p className={style.vsText}>vs</p>
                <p className={results.homeScore < results.awayScore ? style.winPoint : ""}>{results.awayScore}</p>
                <p className={style.teamName}>{results.awayName}</p>
            </div>
            <button className={style.fileBtn} onClick={() => fileLocationHandler()}>
                경기기록보기 &gt;
            </button>
        </div>
    );
};
