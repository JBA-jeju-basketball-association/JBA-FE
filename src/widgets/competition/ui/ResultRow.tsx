import React from 'react';
import style from "./ResultRow.module.css"
import {competitionResult} from "../../../shared/type/CompetitionType";
import formatDate from "../../../shared/lib/formatDate";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";


type Props = {
    results:competitionResult;
}
export const ResultRow = ({results}:Props) => {

    const fileLocationHandler =  () => {
        if (results.fileUrl !== "" && results.fileName !== null) {
            window.location.href = results.fileUrl
        }else {
            alert("경기기록이 없습니다.")
        }
    }
    return (
        <div className={style.ResultRow}>
            <div className={style.timeArea}>
                <p>{formatDate(new Date(results.startTime))}</p>
            </div>
            <div className={style.divisionArea}>
                <p>{DivisionOptions.map((item => item.value === results.division ? item.label : ""))}</p>
            </div>
            <div className={style.pointArea}>
                <div className={style.homePointArea}>
                    <p className={style.teamName}>{results.homeName}</p>
                    <p className={results.homeScore > results.awayScore ? style.winPoint : ""}>{results.homeScore}</p>
                </div>
                <p className={style.vsText}>vs</p>
                <div className={style.awayPointArea}>
                    <p className={results.homeScore < results.awayScore ? style.winPoint : ""}>{results.awayScore}</p>
                    <p className={style.teamName}>{results.awayName}</p>
                </div>
            </div>
            <button className={style.fileBtn} onClick={() => fileLocationHandler()}>
                경기기록보기 &gt;
            </button>
        </div>
    );
};
