import React from 'react';
import {getScheduleResponse, getScheduleResponseRow} from "../../../shared/type/CompetitionType";
import style from "./ScheduleDivisionBox.module.css"
import {ScheduleRow} from "./ScheduleRow";


type Props = {
    data:getScheduleResponse;
}
export const ScheduleDivisionBox = ({data}:Props) => {



    return (
        <div className={style.ScheduleDivisionBox}>
            <p className={style.division}>{data.division}</p>
            <div className={style.rowArea}>
                {data.getScheduleRows.map((item:getScheduleResponseRow, index:number) => {
                    return <ScheduleRow key={index} data={item}/>
                })}
            </div>
        </div>
    );
};
