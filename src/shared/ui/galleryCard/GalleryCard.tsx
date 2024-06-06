import React from "react";
import styles from "./GalleryCard.module.css";
import { GalleryCardType } from "shared/type/GalleryType";
import { useState } from "react";
import { GalleryDetailModal } from "features/galleryDetailModal";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";
import { MeatballIcon } from "utils/icon";

export const GalleryCard = ({ title, imgUrl, galleryId }: GalleryCardType) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: galleryDetailData } = useQuery({
    queryKey: ["galleryDetail", galleryId],
    queryFn: () => Api.get(`/v1/api/gallery/${galleryId}`),
    enabled: modalOpen,
  });

  const modalClick = () => {
    setModalOpen(true);
  };

  const galleryDetail = galleryDetailData?.data.data;
  const idClick = () => {
    console.log(galleryId);
  };

  return (
    <>
      <div className={styles.container}>
        <img
          src={imgUrl}
          alt="갤러리 이미지"
          className={styles.image}
          onClick={modalClick}
        />
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{title}</div>
          <MeatballIcon
            width="20"
            height="20"
            fill="black"
            className={styles.meatBallIcon}
            onClick={idClick}
          />
        </div>
      </div>
      <GalleryDetailModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        galleryDetail={galleryDetail}
      />
    </>
  );
};
