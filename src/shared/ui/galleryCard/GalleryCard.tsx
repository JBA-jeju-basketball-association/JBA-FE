import React, { useEffect } from "react";
import styles from "./GalleryCard.module.css";
import { GalleryCardType } from "shared/type/GalleryType";
import { useState } from "react";
import { GalleryDetailModal } from "features/galleryDetailModal";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "shared/api";
import useGalleryModalStore from "../../model/stores/GalleryModalStore";

export const GalleryCard = ({
  title,
  imgUrl,
  galleryId,
  createAt,
}: GalleryCardType) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data: galleryDetailData } = useQuery({
    queryKey: ["galleryDetail", galleryId],
    queryFn: () => NormalApi.get(`/v1/api/gallery/${galleryId}`),
    enabled: modalOpen,
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
      console.log(res?.data.data);
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
      />
    </>
  );
};
