import React from 'react';
import style from "./CompetitionRow.module.css"
import {competitionListItem} from "../../../pages/competitionPage/type/type";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import {DivisionOptions} from "../../../pages/competitionPage/model/DivisionOptions";

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
    const division:string | undefined = DivisionOptions.find(divisionOption => divisionOption.value === item.division)?.label


    return (
        <div className={style.listArea}>
            <div className={style.listLabel100}>
                <p>{totalElements-index-(pageNumber*10)}</p>
            </div>
            <div className={style.listLabel100}>
                <p>ssss</p>
            </div>
            <div className={style.listLabel100}>
                <p>{division===undefined ? "혼합" :division}</p>
            </div>
            <div className={style.listLabel480}>
                <p>{item?.title}</p>
            </div>
            <div className={style.listLabel280}>
                <p>{startDate} ~ {endDate}</p>
            </div>
            <div className={style.listLabel140}>
                <button onClick={()=> navigate(`/competition/${item.competitionId}`)}>자세히보기</button>
            </div>
        </div>
    );
};
