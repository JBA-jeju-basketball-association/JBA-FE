import React from "react";
import { FileType, UploadType } from "shared/type/GalleryType";
import { GalleryForm } from "shared/ui";
import { useGalleryEdit } from "pages/galleryPages/api/useGalleryEdit";

type EditType = {
  gallery: {
    title: string;
    files: FileType[];
  };
  galleryId: string;
};
//쿼리파라미터에서 가져온 id는 문자열

export const GalleryEdit = ({ gallery, galleryId }: EditType) => {
  const { mutate: editData } = useGalleryEdit(galleryId);

  const handleEdit = (data: UploadType) => {
    editData(data);
  };

  return (
    <GalleryForm
      buttonText="수정하기"
      onSubmit={handleEdit}
      initialTitle={gallery.title}
      initialFiles={gallery.files}
    />
  );
};
