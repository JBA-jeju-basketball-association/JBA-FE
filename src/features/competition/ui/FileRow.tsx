import React from 'react';
import style from "./UpdateFiles.module.css";
import {IFileTypes} from "../../../shared/type/CompetitionType";
import {TiDelete} from "react-icons/ti";

type Props = {
    file: IFileTypes;
    handleFilterFile: (id:number) => void
}
export const FileRow = ({file, handleFilterFile}:Props) => {
    return (
        <div key={file.id} className={style.File}>
            <div className={style.FileName}>{file.object.name}</div>
            <div
                className={style.FilesFilter}
                onClick={() => handleFilterFile(file.id)}
            >
                <TiDelete style={{marginTop: "2px"}} size={16}/>
            </div>
        </div>
    );
};
