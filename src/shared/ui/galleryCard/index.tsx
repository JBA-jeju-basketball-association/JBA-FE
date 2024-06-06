import React from "react";
import styles from "./galleryCard.module.css";
import { GalleryCardType } from "shared/type/Gallery";
import { useState } from "react";
import GalleryDetailModal from "features/galleryDetailModal/ui";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";

const GalleryCard = ({ title, imgUrl, galleryId }: GalleryCardType) => {
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

  return (
    <>
      <div className={styles.container} onClick={modalClick}>
        <img src={imgUrl} alt="갤러리 이미지" className={styles.image} />
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

export default GalleryCard;
