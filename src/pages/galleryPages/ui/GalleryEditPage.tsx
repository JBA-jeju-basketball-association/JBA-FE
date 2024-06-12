import React from "react";
import styles from "./GalleryEditPage.module.css";
import { GalleryEdit } from "features/gallery";
import { PageTitle } from "shared/ui";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "shared/api";

export const GalleryEditPage = () => {
  const galleryId = new URLSearchParams(window.location.search).get(
    "galleryId"
  );
  const { data: galleryEditData } = useQuery({
    queryKey: ["galleryEditDetail"],
    queryFn: () => NormalApi.get(`/v1/api/gallery/${galleryId}`),
  });

  const gallery = galleryEditData?.data?.data ?? [];

  return (
    <div className={styles.container}>
      <PageTitle pageName="갤러리 수정" />
      <GalleryEdit gallery={gallery} galleryId={galleryId!} />
    </div>
  );
};
