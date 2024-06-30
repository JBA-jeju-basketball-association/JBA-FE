import React from "react";
import styles from "./AdminGalleryListData.module.css";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { useGalleryDelete } from "pages/galleryPages/api/useGalleryDelete";
import { AdminGalleryListProps } from "shared/type/AdminType";
import { useGalleryModalStore } from "shared/model";

export const AdminGalleryListData = ({
  titles,
  lists,
}: AdminGalleryListProps) => {
  const { mutate: deleteGallery } = useGalleryDelete();

  const navigate = useNavigate();

  const isOfficial = (isOfficial: boolean) => (isOfficial ? "스태프" : "일반");

  const { setForceModalOpen, setGalleryIdFromMain }: any = useGalleryModalStore(
    (state) => state
  );

  const handleNavigateToDetailPage = (galleryId: number) => {
    setForceModalOpen(true);
    setGalleryIdFromMain(galleryId);
    navigate("/gallery");
  };
  //상세페이지 이동

  const handleNavigateToEditPage = (galleryId: number) => {
    navigate(`/admin/galleryedit/${galleryId}`);
  };
  //수정페이지 이동

  const handleDeleteClick = async (galleryId: number) => {
    const confirm = await confirmAlert("warning", "정말 삭제하시겠습니까?");
    if (confirm) {
      deleteGallery(galleryId);
    }
  };
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
            <span>{isOfficial(list.isOfficial)}</span>
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
