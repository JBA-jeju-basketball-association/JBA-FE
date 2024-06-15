import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";

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
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
    },
  });
};
