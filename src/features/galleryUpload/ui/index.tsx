import React, { ChangeEvent } from "react";
import styles from "./galleryUpload.module.css";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
import { useState, useEffect } from "react";
import { UpdateFiles } from "features/competition/index";
import { IFileTypes } from "shared/type/CompetitionType";
import { competitionDetailAttachedFile } from "shared/type/CompetitionType";
const GalleryUpload = () => {
  const [titleValue, setTitleValue] = useState("");
  const [files, setFiles] = useState<IFileTypes[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<
    competitionDetailAttachedFile[]
  >([]);
  const [attachedFileList, setAttachedFileList] = useState<
    competitionDetailAttachedFile[]
  >([]);

  const handleUploadTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const uploadClick = () => {
    console.log(titleValue);
    console.log(files);
    //여기에 title과 파일 넣어서 전송
  };
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>갤러리제목</p>
        <input
          type="text"
          className={styles.titleInput}
          onChange={handleUploadTitle}
        />
        <p className={styles.upload}>첨부파일</p>
        <UpdateFiles
          files={files}
          setFiles={setFiles}
          attachedFiles={attachedFiles}
          attachedFileList={attachedFileList}
          setAttachedFileList={setAttachedFileList}
        />
      </div>
      <RegitUpdateDeleteButton content="등록" onClickHandler={uploadClick} />
    </>
  );
};

export default GalleryUpload;
