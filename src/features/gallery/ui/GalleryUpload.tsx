import React from "react";
import { UploadType } from "shared/type/GalleryType";
import { GalleryForm } from "shared/ui";
import { useGalleryUpload } from "pages/galleryPages/api/useGalleryUpload";
import confirmAlert from "shared/lib/alert/ConfirmAlert";
import { LoadingSpinner } from "shared/ui";

export const GalleryUpload = () => {
  const { mutate: uploadData, isPending } = useGalleryUpload();

  const handleUpload = async (data: UploadType) => {
    const cofirm = await confirmAlert("question", "등록하시겠습니까?");
    if (cofirm) {
      uploadData(data);
    }
  };
  
  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <GalleryForm
      buttonText="등록하기"
      onSubmit={handleUpload}
      initialTitle=""
      initialFiles={[]}
    />
  );
};
