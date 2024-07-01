import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";

export const useGalleryDelete = () => {
  const queryClient = useQueryClient();

  const deleteGallery = useMutation({
    mutationKey: ["galleryDelete"],
    mutationFn: (galleryId: number) =>
      Api.delete(`/v1/api/gallery/${galleryId}`),
    onSuccess: () => {
      confirmAlert("success", "삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      queryClient.invalidateQueries({ queryKey: ["adminGallery"] });
    },
  });

  return deleteGallery;
};
