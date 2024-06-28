import React from "react";
import styles from "./AdminGalleryListData.module.css";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { useGalleryDelete } from "pages/galleryPages/api/useGalleryDelete";
import { AdminListProps } from "shared/type/AdminType";

export const AdminGalleryListData = ({ titles, lists }: AdminListProps) => {
  const navigate = useNavigate();
  console.log(lists);

  const isOfficial = (isOfficial: boolean) => {
    return isOfficial ? "스태프" : "일반";
  };

  const handleUpdateClick = (galleryId: number) => {
    // navigate(`/gallery/galleryedit?galleryId=${galleryId}`);
    console.log("클릭", galleryId);
  };

  const { mutate: deleteGallery } = useGalleryDelete();

  const handleDeleteClick = async (galleryId: number) => {
    const confirm = await confirmAlert("warning", "정말 삭제하시겠습니까?");
    if (confirm) {
      deleteGallery(galleryId);
    }
  };

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
              <Button onClick={() => handleUpdateClick(list.galleryId)}>
                수정
              </Button>
              <Button onClick={() => handleDeleteClick(list.galleryId)}>
                삭제
              </Button>
            </span>
            <span>{isOfficial(list.isOfficial)}</span>
            <span>
              <img
                src={list.thumbnail}
                alt="thumbnail"
                className={styles.listImg}
              />
            </span>
            <span>{list.title}</span>
            <span>{list.galleryStatus}</span>
            <span>{list.createAt}</span>
            <span>{list.updateAt ? list.updateAt : "없음"}</span>
            <span>{list.deleteAt ? list.deleteAt : "없음"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
