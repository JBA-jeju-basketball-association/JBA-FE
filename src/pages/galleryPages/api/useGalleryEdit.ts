import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";
import { UploadType } from "shared/type/GalleryType";
import { useNavigate } from "react-router-dom";

export const useGalleryEdit = (galleryId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["galleryEdit"],
    mutationFn: (data: UploadType) =>
      Api.put(`/v1/api/gallery/${galleryId}`, data),
    onSuccess: () => {
      confirmAlert("success", "수정이 완료되었습니다.");
      navigate('/admin/gallery');
      queryClient.invalidateQueries({
        queryKey: ["galleryDetail"],
      });
    },
    onError: (e) => {
      console.log(e, "error");
      confirmAlert("error", "중복된 제목이 있습니다.");
    },
  });
};
