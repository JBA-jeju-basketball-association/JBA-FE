import React from "react";
import GalleryCard from "shared/ui/galleryCard";
import styles from "./galleryCardList.module.css";
import { GalleryCardType } from "pages/galleryPage/ui";


type GalleryCardListType = {
  galleries: GalleryCardType[];
};

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
