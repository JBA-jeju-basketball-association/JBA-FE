import React from "react";
import { FileType, UploadType } from "shared/type/GalleryType";
import { GalleryForm } from "shared/ui";
import { useGalleryEdit } from "pages/galleryPages/api/useGalleryEdit";
import confirmAlert from "shared/lib/ConfirmAlert";

type EditType = {
  galleryDetail: {
    title: string;
    files: FileType[];
  };
  galleryId: number;
};
//쿼리파라미터에서 가져온 id는 문자열

export const GalleryEdit = ({ galleryDetail, galleryId }: EditType) => {
  const { mutate: editData } = useGalleryEdit(galleryId);

  const handleEdit = async (data: UploadType) => {
    const cofirm = await confirmAlert("question", "수정하시겠습니까?");
    if (cofirm) {
      editData(data);
    }
  };

  return (
    <GalleryForm
      buttonText="수정하기"
      onSubmit={handleEdit}
      initialTitle={galleryDetail.title}
      initialFiles={galleryDetail.files}
    />
  );
};
