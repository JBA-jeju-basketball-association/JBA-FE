import React, {useEffect, useRef} from 'react';
import style from "./CompetitionDetailInfo.module.css"
import moment from "moment/moment";
import {CompetitionDetailLabel, RegitUpdateDeleteButton} from "../../../shared/ui";
import {CompetitionDetailInfoRow} from "../../../entities/competition";
import {competitionDetailAttachedFile, competitionDetailData} from "../../../shared/type/CompetitionType";
import {CompetitionDetailMakeDivisionText, competitionStatusCalculator} from "../index"
import {useNavigate, useParams} from "react-router-dom";
import {useUserStore} from "../../../shared/model";
import FetchDeleteCompetition from "../api/FetchDeleteCompetition";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import {handleDownload} from "../../../shared/lib/handleDownload";

type Props = {
    data:competitionDetailData
}
export const CompetitionDetailInfo = ({data}:Props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {AccessToken} = useUserStore();
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


    function updateHandler() {
        confirmAndCancelAlertWithLoading("warning", "대회정보를 수정하겠습니까?", "대회수정 페이지로 이동합니다.")
            .then((res) => {
                if (res.isConfirmed) {
                    navigate(`/competition/update-competition/${id}`)
                }
            });
    }

    function deleteHandler() {
        confirmAndCancelAlertWithLoading("warning", "대회를 삭제하겠습니까?", "삭제된 대회는 복구할 수 없습니다.",  async () =>{
            id && await FetchDeleteCompetition(id)
        })
    }

    return (
        <div className={style.CompetitionDetailInfo}>
            <div className={style.fullInfoArea}>
                <CompetitionDetailInfoRow data={competitionStatusCalculator(data?.startDate, data?.endDate)} label={"현황"} type={"half"}/>
                <CompetitionDetailInfoRow data={CompetitionDetailMakeDivisionText(data?.divisions)} label={"종별"} type={"half"}/>
            </div>

            <div className={style.fullInfoArea}>
                <CompetitionDetailInfoRow data={startDate + " ~ " + endDate} label={"대회기간"} type={"half"}/>
                <div className={style.halfInfoArea}>
                    <CompetitionDetailLabel name={"대회장소"}/>
                    <div className={style.info}>
                        {data?.places.map((p: any, index: number) => {
                                return <p key={index}>- {p.placeName} <br/>&nbsp;&nbsp;({p.address})</p>
                            }
                        )}
                    </div>
                </div>
            </div>

            <div className={style.fullInfoArea}>
                <CompetitionDetailInfoRow data={data?.relatedUrl} label={"URL"} type={"full"}/>
            </div>

            <div className={style.fullInfoArea}>
                <div className={style.infoArea}>
                    <CompetitionDetailLabel name={"첨부파일"}/>
                    <div
                        className={style.info}>{data?.competitionDetailAttachedFiles.map((f: competitionDetailAttachedFile, index: number) => {
                        return <button onClick={() => handleDownload(f.filePath, f.fileName)} key={f.competitionAttachedFileId}>{index + 1}. {f.fileName}</button>
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
