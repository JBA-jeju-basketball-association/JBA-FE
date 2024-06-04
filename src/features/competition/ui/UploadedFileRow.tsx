import React from 'react';
import style from "./UploadedFileRow.module.css";
import {competitionDetailAttachedFile} from "../../../shared/type/CompetitionType";

type Props = {
    index: number;
    attachedFile: competitionDetailAttachedFile;
    setAttachedFileList: React.Dispatch<React.SetStateAction<competitionDetailAttachedFile[]>>;
}
export const UploadedFileRow = ({index, attachedFile, setAttachedFileList}:Props) => {


    function fileCancelHandler() {
        setAttachedFileList(prevState =>
            prevState.filter(pre => pre.filePath !== attachedFile.filePath)
        )
    }

    return (
        <div key={index} className={style.File}>
            <div className={style.FileName}>{attachedFile.fileName}</div>
            <div
                className={style.FilesFilter}
                onClick={() => fileCancelHandler()}
            >
                X
            </div>
        </div>
    );
};
