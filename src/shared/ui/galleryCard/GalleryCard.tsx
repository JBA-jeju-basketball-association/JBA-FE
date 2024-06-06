import React from "react";
import styles from "./GalleryCard.module.css";
import { GalleryCardType } from "shared/type/GalleryType";
import { useState } from "react";
import { GalleryDetailModal } from "features/galleryDetailModal";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "shared/api";


export const GalleryCard = ({ title, imgUrl, galleryId }: GalleryCardType) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: galleryDetailData } = useQuery({
    queryKey: ["galleryDetail", galleryId],
    queryFn: () => NormalApi.get(`/v1/api/gallery/${galleryId}`),
    enabled: modalOpen,
  });

  const modalClick = () => {
    setModalOpen(true);
  };

  const galleryDetail = galleryDetailData?.data.data;

  return (
    <>
      <div className={styles.container}>
        <img
          src={imgUrl}
          alt="갤러리 이미지"
          className={styles.image}
          onClick={modalClick}
        />
        <div className={styles.title}>{title}</div>
      </div>
      <GalleryDetailModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        galleryDetail={galleryDetail}
      />
    </>
  );
};
