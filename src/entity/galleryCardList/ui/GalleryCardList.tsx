import React from "react";
import { GalleryCard } from "shared/ui";
import styles from "./GalleryCardListmodule.css";
import { GalleryCardType, GalleryCardListType } from "shared/type/GalleryType";

export const GalleryCardList = ({ galleries }: GalleryCardListType) => {
  return (
    <div className={styles.container}>
      {galleries.map((gallery: GalleryCardType) => (
        <GalleryCard key={gallery.galleryId} {...gallery} />
      ))}
    </div>
  );
};
