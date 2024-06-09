import React from 'react';
import style from "./AnnouncementCard.module.css"
import {getMainCompetition} from "../../../shared/type/MainType";
import formatDate2 from "../../../shared/lib/formatDate2";
import {useNavigate} from "react-router-dom";

type Props = {

}
export const AnnouncementCard = ({}:Props) => {
    const navigate = useNavigate();
    return (
        <div className={style.AnnouncementCard}>
            <div className={style.titleArea}>
                <p className={style.shortHead}>[안내]</p>
                <h2 className={style.title}>2024 선수경력자 진로멘토링 프로그램 멘티 모집 긴급 안내 사항</h2>
            </div>
            <div className={style.dateArea}>
                <p className={style.regitDate}>2024-06-17</p>
            </div>
        </div>
    );
};
