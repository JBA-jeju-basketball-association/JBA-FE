import React, { useEffect } from "react";
import GalleryCard from "shared/ui/galleryCard";
import styles from "./galleryCardList.module.css";

type GalleryCardType = {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
};

type GalleryCardListType = {
  galleries: GalleryCardType[];
};

const GalleryCardList = ({ galleries }: any) => {
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
