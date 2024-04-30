import React, {useEffect, useRef} from 'react';
import style from "./CompetitionDetailInfo.module.css"
import moment from "moment/moment";
import {CompetitionDetailLabel} from "../../../shared/ui";
import {CompetitionDetailInfoRow} from "../../../entity/competition";
import {competitionDetailAttachedFiles, competitionDetailData} from "../../../shared/type/CompetitionDetailType";
import {competitionDetailMakeDivisionText, competitionStatusCalculator} from "../index"

type Props = {
    data:competitionDetailData
}
export const CompetitionDetailInfo = ({data}:Props) => {


    const startDate: string = moment(data?.startDate).format('YYYY-MM-DD');
    const endDate: string = moment(data?.endDate).format('YYYY-MM-DD');

    const renderHTML = (htmlString:string) => {
        const tempEl = document.createElement('div');
        tempEl.innerHTML = htmlString;
        return tempEl;
    };
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // @ts-ignore
        container.innerHTML = ''; // 이전 내용 초기화

        const htmlElement = renderHTML(data?.content);
        // @ts-ignore
        container.appendChild(htmlElement);
    }, [data?.content]);






    return (
        <div className={style.CompetitionDetailInfo}>
            <div className={style.fullInfoArea}>
                <CompetitionDetailInfoRow data={competitionStatusCalculator(data?.startDate, data?.endDate)} label={"현황"} type={"half"} />
                <CompetitionDetailInfoRow data={competitionDetailMakeDivisionText(data?.divisions)} label={"종별"} type={"half"} />
            </div>

            <div className={style.fullInfoArea}>
                <CompetitionDetailInfoRow data={startDate+ " ~ " + endDate} label={"대회기간"} type={"half"} />
                <div className={style.halfInfoArea}>
                    <CompetitionDetailLabel name={"대회장소"}/>
                    <div className={style.info}>
                        {data?.places.map((p:any, index:number) => {
                                return <p key={index}>- {p.placeName}</p>
                            }
                        )}
                    </div>
                </div>
            </div>

            <div className={style.fullInfoArea}>
                <CompetitionDetailInfoRow data={data?.relatedUrl} label={"URL"} type={"full"} />
            </div>

            <div className={style.fullInfoArea}>
                <div className={style.infoArea}>
                    <CompetitionDetailLabel name={"첨부파일"}/>
                    <div className={style.info}>{data?.competitionDetailAttachedFiles.map((f:competitionDetailAttachedFiles, index:number)=> {
                        return <a href={f.filePath} key={index}>{index+1}. {f.fileName}</a>
                    })}</div>

                </div>
            </div>

            <div className={style.fullInfoArea}>
                <div className={style.infoArea}>
                    <CompetitionDetailLabel name={"내용"}/>
                    <div className={style.contentArea} ref={containerRef}/>
                </div>
            </div>
        </div>
    );
};
