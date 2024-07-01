import React, { useEffect } from "react";
import styles from "./GalleryCard.module.css";
import { GalleryCardType } from "shared/type/GalleryType";
import { useState } from "react";
import { GalleryDetailModal } from "features/gallery";
import { NormalApi } from "shared/api";
import { useGalleryModalStore } from "shared/model/stores/GalleryModalStore";
import { useGalleryDetailData } from "pages/galleryPages/api/useGalleryDetailData";
import { useNavigate } from "react-router-dom";

export const GalleryCard = ({
  title,
  imgUrl,
  galleryId,
  createAt,
}: GalleryCardType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: galleryDetailData } = useGalleryDetailData({
    galleryId,
    modalOpen,
  });

  const modalClick = () => {
    setModalOpen(true);
  };

  let galleryDetail = galleryDetailData?.data.data;

  // main페이지에서 gallery페이지 이동 후 modal open 로직
  const { forceModalOpen, setForceModalOpen, galleryIdFromMain }: any =
    useGalleryModalStore();

  const getGalleryData = async () => {
    await NormalApi.get(`/v1/api/gallery/${galleryIdFromMain}`).then((res) => {
      galleryDetail = res?.data.data;
      setModalOpen(true);
    });
  };

  useEffect(() => {
    if (forceModalOpen && galleryId === galleryIdFromMain) {
      window.scroll(0, 160);
      setForceModalOpen(false);
      getGalleryData();
    }
  }, [forceModalOpen]);

  return (
    <>
      <div className={styles.container}>
        <img
          src={imgUrl}
          alt="갤러리 이미지"
          className={styles.image}
          onClick={modalClick}
        />
        <div className={styles.title}>
          <p>{title}</p>
          <span>{createAt}</span>
        </div>
      </div>
      <GalleryDetailModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        galleryDetail={galleryDetail}
        galleryId={galleryId}
      />
    </>
  );
};
