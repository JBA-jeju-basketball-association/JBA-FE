import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "shared/api";

type useGalleryDetailDataProps = {
  galleryId: number;
  modalOpen?: boolean;
};

export const useGalleryDetailData = ({
  galleryId,
  modalOpen,
}: useGalleryDetailDataProps) => {
  return useQuery({
    queryKey: ["galleryDetail", galleryId],
    queryFn: () => NormalApi.get(`/v1/api/gallery/${galleryId}`),
    enabled: modalOpen,
  });
};
