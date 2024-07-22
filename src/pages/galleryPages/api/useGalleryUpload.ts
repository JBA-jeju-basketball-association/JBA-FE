import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { UploadType } from "shared/type/GalleryType";

export const useGalleryUpload = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["galleryUpload"],
    mutationFn: (data: UploadType) =>
      Api.post("/v1/api/gallery/register", data, {
        params: {
          official: false,
        },
      }),
    onSuccess: () => {
      confirmAlert("success", "등록이 완료되었습니다.");
      navigate("/gallery");
      queryClient.invalidateQueries({ queryKey: ["adminGallery"] });
    },
    onError: (e) => {
      console.log(e, "error");
      confirmAlert("error", " 중복된 제목이 있습니다.");
    },
  });
};
