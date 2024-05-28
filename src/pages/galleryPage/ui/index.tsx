import React from "react";
import GalleryCardList from "entity/galleryCardList/ui";
import styles from "./galleryPage.module.css";

const GalleryPage = () => {
  return (
    <div className={styles.container}>
      <h1>갤러리</h1>
      <GalleryCardList />
      <div>페이지네이션</div>
      <div>검색</div>
    </div>
  );
};

export default GalleryPage;
