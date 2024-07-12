import React from "react";
import styles from "./AdminGalleryListData.module.css";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";

import {
  AdminCompetitionListProps,
  CompetitionListsType,
} from "shared/type/AdminType";

export const AdminCompetitionListData = ({
  titles,
  lists,
}: AdminCompetitionListProps) => {
  const handleNavigateToDetailPage = (galleryId: number) => {};
  //상세페이지 이동

  const handleNavigateToEditPage = (galleryId: number) => {};
  //수정페이지 이동

  const handleDeleteClick = async (galleryId: number) => {};
  //삭제

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        {titles.map((title, index) => (
          <h1 key={index}>{title}</h1>
        ))}
      </div>
      <div className={styles.contentWrapper}>
        {/* {lists?.map((list: CompetitionListsType) => (
          <div key={list.postId} className={styles.listWrapper}></div>
        ))} */}
      </div>
    </div>
  );
};
