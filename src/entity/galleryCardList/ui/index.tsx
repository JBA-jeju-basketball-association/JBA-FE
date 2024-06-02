import React from "react";
import GalleryCard from "shared/ui/galleryCard";
import styles from "./galleryCardList.module.css";
import { GalleryCardType, GalleryCardListType } from "shared/type/Gallery";

const GalleryCardList = ({ galleries }: GalleryCardListType) => {
  return (
    <div className={styles.container}>
      {galleries.map((gallery: GalleryCardType) => (
        <GalleryCard
          key={gallery.galleryId}
          title={gallery.title}
          imgUrl={gallery.imgUrl}
        />
      ))}
    </div>
  );
};

export default GalleryCardList;
