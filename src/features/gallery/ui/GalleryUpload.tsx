import React from "react";
import { UploadType } from "shared/type/GalleryType";
import { GalleryForm } from "shared/ui";
import { useGalleryUpload } from "pages/galleryPages/api/useGalleryUpload";

export const GalleryUpload = () => {
  const { mutate: uploadData } = useGalleryUpload();

  const handleUpload = (data: UploadType) => {
    uploadData(data);
  };

  return (
    <GalleryForm
      buttonText="등록하기"
      onSubmit={handleUpload}
      initialTitle=""
      initialFiles={[]}
    />
  );
};
