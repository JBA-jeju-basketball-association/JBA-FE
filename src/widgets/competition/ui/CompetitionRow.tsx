import React from 'react';
import style from "./CompetitionRow.module.css"
import {competitionListItem} from "../../../shared/type/CompetitionType";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {competitionStatusCalculator} from "../index";

type Props = {
    index:number
    item:competitionListItem
    totalElements:number;
    pageNumber:number;
}
export const CompetitionRow = ({item, index, totalElements, pageNumber}:Props) => {
    const navigate = useNavigate();
    const startDate: string = moment(item.startDate).format('YYYY-MM-DD');
    const endDate: string = moment(item.endDate).format('YYYY-MM-DD');

    const navigateDetailPage = () => {
        if (item.competitionId) {
            navigate(`/competition/${item.competitionId}`)
        }
    };
    const status:string = competitionStatusCalculator(item.startDate, item.endDate);

    return (
        <div className={style.listArea} onClick={()=> navigateDetailPage()}>
            <div className={style.listLabel100}>
                <p>{totalElements-index-(pageNumber*10)}</p>
            </div>
            <div className={style.listLabel100} style={status==="진행중"?{color:"blue"}:status==="예정"?{color:"red"}:{color:"black"}}>
                <p>{status}</p>
            </div>
            <div className={style.listLabel100}>
                <p>{item.division}</p>
            </div>
            <div className={style.listLabel740}>
                <p>{item?.title}</p>
            </div>
            <div className={style.listLabel280}>
                <p>{startDate} ~ {endDate}</p>
            </div>
        </div>
    );
};
