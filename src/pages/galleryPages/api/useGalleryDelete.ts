import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";

type useGalleryDeleteProps = {
  galleryId: number;
  setModalOpen: (isOpen: boolean) => void;
};

export const useGalleryDelete = ({
  galleryId,
  setModalOpen,
}: useGalleryDeleteProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["galleryDelete"],
    mutationFn: () => Api.delete(`/v1/api/gallery/${galleryId}`),
    onSuccess: () => {
      confirmAlert("success", "삭제가 완료되었습니다.");
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
    },
  });
};
