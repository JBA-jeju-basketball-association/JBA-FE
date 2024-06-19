import React from "react";
import styles from "./GalleryEditPage.module.css";
import { GalleryEdit } from "features/gallery";
import { PageTitle } from "shared/ui";
import { useLocation } from "react-router-dom";

export const GalleryEditPage = () => {
  const location = useLocation();
  // url에 담긴 정보 확인
  const { galleryId, galleryDetail } = location.state;

  return (
    <div className={styles.container}>
      <PageTitle pageName="갤러리 수정" />
      <GalleryEdit galleryDetail={galleryDetail} galleryId={galleryId!} />
    </div>
  );
};
