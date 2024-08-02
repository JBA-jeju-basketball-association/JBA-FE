import React from 'react';
import style from "./ResultRow.module.css"
import {getCompetitionResultRow} from "../../../shared/type/CompetitionType";
import formatDate from "../../../shared/lib/formatDate";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";
import {handleDownload} from "../../../shared/lib/handleDownload";


type Props = {
    data:getCompetitionResultRow;
}
export const ResultRow = ({data}:Props) => {


    function fileHandler() {
        if(data.filePath) {
            handleDownload(data.filePath, data.fileName)
        }else {
            confirmAlert("warning", "파일이 없습니다.")
        }
    }

    return (
        <div className={style.ResultRow}>
            <div className={style.gameNumberArea}>
                <p>{data.gameNumber}</p>
            </div>
            <div className={style.startDateArea}>
                <p>{data.startDate ? formatDate(new Date(data.startDate)) : null}</p>
            </div>
            <div className={style.floorArea}>
                <p>{data.floor + (data.state5x5 ? "" : "(3x3)")}</p>
            </div>
            <div className={style.placeArea}>
                <p>{data.place}</p>
            </div>
            <div className={style.homeAwayArea}>
                <div className={style.homeNameArea}>
                    <p>{data.homeName}</p>
                </div>
                <div
                    className={data.homeScore === data.awayScore ? style.drawnScore : data.homeScore > data.awayScore ? style.winScore : style.loseScore}>
                    <p>{data.homeScore}</p>
                </div>
                <div className={style.vsArea}>
                    <p>vs</p>
                </div>
                <div
                    className={data.homeScore === data.awayScore ? style.drawnScore : data.homeScore > data.awayScore ? style.loseScore : style.winScore}>
                    <p>{data.awayScore}</p>
                </div>
                <div className={style.awayNameArea}>
                    <p>{data.awayName}</p>
                </div>
            </div>
            <div className={style.fileArea}>
                <button className={style.fileBtn} onClick={fileHandler}>
                    <MdOutlineDriveFolderUpload size={24}/>
                    <p>파일</p>
                </button>
            </div>
        </div>
    );
};
