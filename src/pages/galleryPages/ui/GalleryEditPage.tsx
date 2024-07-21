import React from "react";
import styles from "./GalleryEditPage.module.css";
import { GalleryEdit } from "features/gallery";
import { PageTitle } from "shared/ui";
import { useParams } from "react-router-dom";
import { useGalleryDetailData } from "../api/useGalleryDetailData";
import { LoadingSpinner } from "shared/ui";

export const GalleryEditPage = () => {
  const params = useParams();

  const galleryId = parseInt(params.galleryId!);

  const { data: galleryDetailData, isLoading } = useGalleryDetailData({
    galleryId,
  });

  const galleryDetail = galleryDetailData?.data.data ?? [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <PageTitle pageName="갤러리 수정" />
      <GalleryEdit galleryDetail={galleryDetail} galleryId={galleryId!} />
    </div>
  );
};
//디테일 함수 넣기
