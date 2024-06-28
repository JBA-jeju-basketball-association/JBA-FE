import React from 'react';
import style from "./ScheduleRow.module.css"
import {getScheduleResponseRow} from "../../../shared/type/CompetitionType";
import formatDate from "../../../shared/lib/formatDate";

type Props = {
    data:getScheduleResponseRow;
}
export const ScheduleRow = ({data}:Props) => {
    return (
        <div className={style.ScheduleRow}>
            <div className={style.gameNumberArea}>
                <p>{data.gameNumber}</p>
            </div>
            <div className={style.startDateArea}>
                <p>{data.startDate ? formatDate(new Date(data.startDate)) : null}</p>
            </div>
            <div className={style.floorArea}>
                <p>{data.floor+ " " + (data.state5x5 ? "" : "(3x3)")}</p>
            </div>
            <div className={style.placeArea}>
                <p>{data.place}</p>
            </div>
            <div className={style.homeAwayArea}>
                <div className={style.homeNameArea}>
                    <p>{data.homeName}</p>
                </div>
                <div  className={style.vsArea}>
                    <p>vs</p>
                </div>
                <div className={style.awayNameArea}>
                    <p>{data.awayName}</p>
                </div>
            </div>
        </div>
    );
};
