import React from 'react';
import style from "./AnnouncementCard.module.css"
import {useNavigate} from "react-router-dom";
import {getMainAnnouncement} from "../../../shared/type/MainType";

type Props = {
    data: getMainAnnouncement
}
export const AnnouncementCard = ({data}:Props) => {
    const navigate = useNavigate();
    return (
        <div className={style.AnnouncementCard} onClick={() => navigate(`/post/notice/${data?.postId}`)}>
            <div className={style.titleArea}>
                {data?.foreword ? <p className={style.shortHead}>[{data?.foreword}]</p> : <p className={style.shortHead}></p>}
                <h2 className={style.title}>{data?.title}</h2>
            </div>
            <div className={style.dateArea}>
                <p>{data?.createAt}</p>
            </div>
        </div>
    );
};
