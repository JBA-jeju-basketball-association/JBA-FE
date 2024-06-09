import React from 'react';
import style from "./CompetitionCard.module.css"
import {getMainCompetition} from "../../../shared/type/MainType";
import formatDate2 from "../../../shared/lib/formatDate2";
import {useNavigate} from "react-router-dom";

type Props = {
    data: getMainCompetition

}
export const CompetitionCard = ({data}:Props) => {
    const navigate = useNavigate();
    return (
        <div className={style.CompetitionCard}>
            <div className={style.topArea}>
                <p className={style.title}>{data?.title}</p>
            </div>
            <div className={style.bottomArea}>
                <p className={style.date}>{formatDate2(new Date(data.startDate)) + " ~ " + formatDate2(new Date(data.endDate))}</p>
                {data?.places.length !== 0 && (data?.places?.length === 1 ?
                    <p className={style.place}>{data?.places[0]}</p>
                    :
                    <p className={style.place}>{data?.places[0] + " 외 " + (data?.places?.length - 1)}</p>
                )
                }
                <button
                    className={style.linkBtn}
                    onClick={() => navigate(`/competition/${data?.competitionId}`)}
                >자세히보기</button>
            </div>
        </div>
    );
};
