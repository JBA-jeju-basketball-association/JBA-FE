import React from "react";
import styles from "./galleryCard.module.css";
import { GalleryCardType } from "shared/type/Gallery";
import { useState } from "react";
import GalleryDetailModal from "features/galleryDetailModal/ui";

const GalleryCard = ({ title, imgUrl }: GalleryCardType) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalClick = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <img
        src={imgUrl}
        alt="갤러리 이미지"
        className={styles.image}
        onClick={modalClick}
      />
      <div className={styles.title}>{title}</div>
      <GalleryDetailModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
      />
    </div>
  );
};

export default GalleryCard;
