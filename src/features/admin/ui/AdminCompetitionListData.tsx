import React from "react";
import styles from "./AdminGalleryListData.module.css";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { AdminGalleryListProps } from "shared/type/AdminType";

export const AdminCompetitionListData = ({
  titles,
  lists,
}: AdminGalleryListProps) => {
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
        {lists?.map((list: any) => (
          <div key={list.galleryId} className={styles.listWrapper}>
            <span>{list.galleryId}</span>
            <span>{list.email}</span>
            <span className={styles.btn}>
              <Button onClick={() => handleNavigateToEditPage(list.galleryId)}>
                수정
              </Button>
              <Button onClick={() => handleDeleteClick(list.galleryId)}>
                삭제
              </Button>
            </span>
            <span>
              <img
                src={list.thumbnail}
                alt="thumbnail"
                className={styles.listImg}
              />
            </span>
            <span
              className={styles.titleSpan}
              onClick={() => handleNavigateToDetailPage(list.galleryId)}
            >
              {list.title}
            </span>
            <span>{list.galleryStatus}</span>
            <span>{list.createAt}</span>
            <span>{list.updateAt || "없음"}</span>
            <span>{list.deleteAt || "없음"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
