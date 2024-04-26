import React from 'react';
import style from "./CompetitionTitleArea.module.css"
export const CompetitionTitleArea = () => {
    return (
        <div className={style.listTitleArea}>
            <div className={style.listTitleLabel100}>
                <label>NO</label>
            </div>
            <div className={style.listTitleLabel100}>
                <label>현황</label>
            </div>
            <div className={style.listTitleLabel100}>
                <label>종별</label>
            </div>
            <div className={style.listTitleLabel480}>
                <label>대회명</label>
            </div>
            <div className={style.listTitleLabel280}>
                <label>대회기간</label>
            </div>
            <div className={style.listTitleLabel140}>
                <label>보기</label>
            </div>
        </div>
    );
};
