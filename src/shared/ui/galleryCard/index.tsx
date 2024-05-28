import React from "react";
import styles from "./galleryCard.module.css";

type GalleryCardType = {
  title: string;
  imgUrl: string;
};

const GalleryCard = ({ title, imgUrl }: GalleryCardType) => {
  return (
    <div className={styles.container}>
      <img src={imgUrl} alt="갤러리 이미지" className={styles.image} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default GalleryCard;
