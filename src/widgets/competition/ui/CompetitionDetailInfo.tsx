import React from 'react';
import style from "./CompetitionDetailInfo.module.css"
import {CompetitionDetailLabel} from "../../../entity/competition";
export const CompetitionDetailInfo = () => {
    return (
        <div className={style.CompetitionDetailInfo}>
            <div className={style.fullInfoArea}>
                <div className={style.halfInfoArea}>
                    <CompetitionDetailLabel name={"현황"}/>
                    <div className={style.info}><p>예정</p></div>
                </div>
                <div className={style.halfInfoArea}>
                    <CompetitionDetailLabel name={"종별"}/>
                    <div className={style.info}><p>혼합(초등, 중등, 고등, 일반)</p></div>

                </div>
            </div>

            <div className={style.fullInfoArea}>
                <div className={style.halfInfoArea}>
                    <CompetitionDetailLabel name={"대회기간"}/>
                    <div className={style.info}><p>2023-03-16 ~ 2023-03-24</p></div>
                </div>
                <div className={style.halfInfoArea}>
                    <CompetitionDetailLabel name={"대회장소"}/>
                    <div className={style.info}><p>사라봉다목적체육관</p></div>
                </div>
            </div>

            <div className={style.fullInfoArea}>
                <div className={style.infoArea}>
                    <CompetitionDetailLabel name={"URL"}/>
                    <div className={style.info}><p>www.대회관련.url</p></div>
                </div>
            </div>

            <div className={style.fullInfoArea}>
                <div className={style.infoArea}>
                    <CompetitionDetailLabel name={"첨부파일"}/>
                    <div className={style.info}><p>2023 제주도민체전_대회공고.pdf <br/><br/> 2023 제주도민체전 참가신청서</p></div>
                </div>
            </div>
            <div className={style.fullInfoArea}>
                <div className={style.infoArea}>
                    <CompetitionDetailLabel name={"내용"}/>
                    <div className={style.info}><p>23년도 3월 16일 제주특별자치도 도민체전이 개최됩니다. 많은 관심 부탁드립니다.</p></div>
                </div>
            </div>
        </div>
    );
};
